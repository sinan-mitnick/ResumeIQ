const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResumeIQ API is healthy 🚀"
  });
});

module.exports = router;