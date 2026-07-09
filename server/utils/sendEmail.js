const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
    try {
        console.log("Sending email via Resend...");

        const { data, error } = await resend.emails.send({
            from: "ResumeIQ <onboarding@resend.dev>",
            to: email,
            subject: "ResumeIQ Verification Code",
            html: `
                <div style="font-family:Arial;padding:30px">
                    <h2>ResumeIQ Email Verification</h2>

                    <p>Your verification code is:</p>

                    <h1 style="
                        letter-spacing:6px;
                        color:#2563eb;
                        font-size:42px;
                    ">
                        ${otp}
                    </h1>

                    <p>This code expires in <b>5 minutes</b>.</p>
                </div>
            `,
        });

        if (error) {
            console.error(error);
            throw new Error(error.message);
        }

        console.log("✅ Email sent:", data.id);

    } catch (err) {
        console.error("❌ Email Error:", err);
        throw err;
    }
};

module.exports = sendOTPEmail;