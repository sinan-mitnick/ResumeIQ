const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOTPEmail = require("../utils/sendEmail");
const pool = require("../db/db");

exports.register = async (req, res) => {

    try {

        console.log("1. Register started");

        const { name, email, password } = req.body;

        console.log("2. Body received");

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        console.log("3. Existing user checked");

        if (existingUser.rows.length > 0) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("4. Password hashed");

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const expires = new Date(
            Date.now() + 5 * 60 * 1000
        );

        console.log("5. OTP generated");

        await pool.query(
            `DELETE FROM pending_users WHERE email=$1`,
            [email]
        );

        console.log("6. Old pending user deleted");

        await pool.query(
            `INSERT INTO pending_users
            (name,email,password,otp,otp_expires)
            VALUES($1,$2,$3,$4,$5)`,
            [
                name,
                email,
                hashedPassword,
                otp,
                expires
            ]
        );

        console.log("7. Pending user inserted");

        await sendOTPEmail(email, otp);

        console.log("8. Email sent");

        return res.status(200).json({
            success: true,
            message: "Verification code sent"
        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: "Email and password are required"

            });

        }

        const userResult = await pool.query(

            "SELECT * FROM users WHERE email=$1",

            [email]

        );

        if (userResult.rows.length === 0) {

            return res.status(401).json({

                success: false,
                message: "Invalid email or password"

            });

        }

        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,
                message: "Invalid email or password"

            });

        }

        const token = jwt.sign(

            {

                id: user.id,
                email: user.email

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.json({

            success: true,

            token,

            user: {

                id: user.id,
                name: user.name,
                email: user.email

            }

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};
exports.forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({
                message: "Email not found"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const expires = new Date(Date.now() + 5 * 60 * 1000);

        await pool.query(
            `UPDATE users
             SET otp=$1, otp_expires=$2
             WHERE email=$3`,
            [otp, expires, email]
        );

        await sendOTPEmail(email, otp);

        res.json({
            message: "OTP sent successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Failed to send OTP"
        });

    }
};
exports.verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const result = await pool.query(
            "SELECT otp, otp_expires FROM users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result.rows[0];

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (new Date() > new Date(user.otp_expires)) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        res.json({
            message: "OTP verified"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Verification failed"
        });

    }

};
exports.verifyRegisterOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const result = await pool.query(
            "SELECT * FROM pending_users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Registration request not found"
            });

        }

        const user = result.rows[0];

        if (user.otp !== otp) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        if (new Date() > new Date(user.otp_expires)) {

            return res.status(400).json({
                message: "OTP expired"
            });

        }

        const inserted = await pool.query(

            `INSERT INTO users(name,email,password)
             VALUES($1,$2,$3)
             RETURNING id,name,email`,

            [
                user.name,
                user.email,
                user.password,
            ]

        );

        await pool.query(

            "DELETE FROM pending_users WHERE email=$1",

            [email]

        );

        const token = jwt.sign(

            {
                id: inserted.rows[0].id,
                email: inserted.rows[0].email,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d",
            }

        );

        res.json({

            success: true,

            token,

            user: inserted.rows[0],

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

};
exports.resetPassword = async (req, res) => {

    try {

        const { email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        await pool.query(
            `UPDATE users
             SET password=$1,
                 otp=NULL,
                 otp_expires=NULL
             WHERE email=$2`,
            [hashed, email]
        );

        res.json({
            message: "Password updated successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Reset failed"
        });

    }

};