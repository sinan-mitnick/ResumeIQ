const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

const sendOTPEmail = async (email, otp) => {

    try {

        console.log("Sending email...");
        console.log("Sending email to:", email);
        console.log("Calling sendMail...");
        const info = await transporter.sendMail({

            from: `"ResumeIQ" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: "ResumeIQ Verification Code",

            html: `
                <h2>Your ResumeIQ Verification Code</h2>
                <h1>${otp}</h1>
                <p>This code expires in 5 minutes.</p>
            `

        });


        console.log("✅ Email sent:", info.messageId);

    } catch (err) {

        console.error("❌ Email Error:", err);

        throw err;

    }

};

module.exports = sendOTPEmail;