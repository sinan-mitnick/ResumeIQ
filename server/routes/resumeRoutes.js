const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const resumeController = require("../controllers/resumeController");

router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),
    resumeController.uploadResume
);

router.get(
    "/my-resumes",
    authMiddleware,
    resumeController.getMyResumes
);
router.get(
    "/stats",
    authMiddleware,
    resumeController.getResumeStats
);
router.delete(
    "/:id",
    authMiddleware,
    resumeController.deleteResume
);
router.get(
    "/:id",
    authMiddleware,
    resumeController.getResumeById
);

module.exports = router;