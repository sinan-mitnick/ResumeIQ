require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./db/db");

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();

// =======================
// CORS
// =======================

const allowedOrigins = [
    "http://localhost:5173",
    "https://resume-iq-kohl.vercel.app/",
];

app.use(
    cors({
        origin: function (origin, callback) {

            // Allow Postman, Thunder Client, etc.
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        credentials: true,
    })
);

// =======================
// Middleware
// =======================

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Routes
// =======================

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/notes", notesRoutes);

app.post("/test", (req, res) => {

    console.log("TEST ROUTE HIT");
    console.log(req.body);

    res.json({
        success: true,
    });

});

app.get("/", (req, res) => {

    res.json({
        message: "Welcome to ResumeIQ API 🚀",
    });

});

// =======================
// Database
// =======================

(async () => {

    try {

        await pool.query("SELECT NOW()");

        console.log("✅ PostgreSQL Connected");

    }

    catch (err) {

        console.error(
            "Database connection failed:",
            err
        );

    }

})();

// =======================
// Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server running on port ${PORT}`
    );

});