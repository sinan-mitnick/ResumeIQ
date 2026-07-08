const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

// Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);

router.post(
    "/verify-register-otp",
    authController.verifyRegisterOTP
);

// Forgot Password
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp", authController.verifyOTP);
router.post("/reset-password", authController.resetPassword);

router.get("/test", (req, res) => {
    res.send("Auth Routes Working");
});

module.exports = router;