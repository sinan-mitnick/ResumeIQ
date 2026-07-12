const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

(async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful");
  } catch (err) {
    console.error("❌ SMTP verify failed:");
    console.error(err);
  }
})();