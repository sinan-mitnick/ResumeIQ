const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

});

const sendOTPEmail = async (email, otp) => {

    const info = await transporter.sendMail({

        from: `"ResumeIQ" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "ResumeIQ Password Reset OTP",

        html: `
            <div style="font-family:Arial;padding:30px">

                <h2>Password Reset</h2>

                <p>You requested a password reset.</p>

                <h1 style="
                    letter-spacing:6px;
                    color:#2563eb;
                    font-size:42px;
                ">
                    ${otp}
                </h1>

                <p>This OTP expires in <b>5 minutes</b>.</p>

                <p>If you didn't request this,
                simply ignore this email.</p>

                <br>

                <b>ResumeIQ Team</b>

            </div>
        `,

    });console.log("Email sent:", info.messageId);

};

module.exports = sendOTPEmail;