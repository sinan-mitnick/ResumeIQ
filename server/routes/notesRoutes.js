const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const notesController = require("../controllers/notesController");

router.post(

    "/",

    authMiddleware,

    notesController.saveNotes

);

router.get(

    "/:resumeId",

    authMiddleware,

    notesController.getNotes

);

module.exports = router;