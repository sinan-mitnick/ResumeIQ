const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    family: 4,

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

        console.log("Verifying SMTP...");

        await transporter.verify();

        console.log("✅ SMTP Verified");

        console.log("Sending email to:", email);

        const info = await transporter.sendMail({
            from: '"ResumeIQ" <resumeiq.ai.ai@gmail.com>',
            to: email,
            subject: "ResumeIQ Verification Code",
            html: `
                <div style="font-family:Arial;padding:30px">
                    <h2>ResumeIQ</h2>

                    <p>Your verification code is:</p>

                    <h1 style="
                        color:#2563eb;
                        font-size:42px;
                        letter-spacing:6px;
                    ">
                        ${otp}
                    </h1>

                    <p>This OTP expires in <b>5 minutes</b>.</p>

                    <p>If you didn't request this email, simply ignore it.</p>

                    <br>

                    <b>ResumeIQ Team</b>
                </div>
            `,
        });

        console.log("✅ Email sent:", info.messageId);

    } catch (err) {

        console.error("❌ Email Error:");
        console.error(err);

        throw err;
    }
};

module.exports = sendOTPEmail;