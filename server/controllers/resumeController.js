const pdf = require("pdf-parse");
const { analyzeResume } = require("../services/geminiService");
const pool = require("../db/db");

exports.uploadResume = async (req, res) => {
    try {

        // Extract text from PDF
        const data = await pdf(req.file.buffer);

        // Analyze using Gemini
        const analysis = await analyzeResume(data.text);

        // Clean Gemini response
        const cleaned = analysis
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(cleaned);

        // Temporary user id
        // We'll replace this with JWT later
    const userId = req.user.id;
        // Save analysis
        console.log("===========");
console.log(result);
console.log(req.file.originalname);
console.log(userId);
console.log("===========");
        await pool.query(
            `
            INSERT INTO resumes
            (
                user_id,
                file_name,
                ats_score,
                summary,
                analysis
            )
            VALUES ($1,$2,$3,$4,$5)
            `,
            [
                userId,
                req.file.originalname,
                result.atsScore,
                result.summary,
                JSON.stringify(result)
            ]
        );

        return res.json({
            success: true,
            analysis: result
        });

    } catch (error) {
    console.error("========= ERROR =========");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
        success: false,
        message: error.message,
    });


    }
};
exports.getMyResumes = async (req, res) => {
    try {

        const result = await pool.query(
            `
            SELECT
                id,
                file_name,
                ats_score,
                created_at
            FROM resumes
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [req.user.id]
        );

        res.json({
            success: true,
            resumes: result.rows
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
exports.getResumeById = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT
                id,
                file_name,
                ats_score,
                summary,
                analysis,
                created_at
            FROM resumes
            WHERE id = $1
            AND user_id = $2
            `,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        res.json({
            success: true,
            resume: result.rows[0]
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
exports.getResumeStats = async (req, res) => {
    try {

        const result = await pool.query(
            `
            SELECT
                COUNT(*) AS total_resumes,
                COALESCE(MAX(ats_score), 0) AS highest_ats,
                COALESCE(ROUND(AVG(ats_score)), 0) AS average_ats
            FROM resumes
            WHERE user_id = $1
            `,
            [req.user.id]
        );

        const latestResume = await pool.query(
            `
            SELECT
                file_name,
                created_at
            FROM resumes
            WHERE user_id = $1
            ORDER BY created_at DESC
            LIMIT 1
            `,
            [req.user.id]
        );

        res.json({
            success: true,
            stats: {
                totalResumes: Number(result.rows[0].total_resumes),
                highestATS: Number(result.rows[0].highest_ats),
                averageATS: Number(result.rows[0].average_ats),
                latestResume:
                    latestResume.rows[0]?.file_name || "No Resume"
            }
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
exports.deleteResume = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM resumes
            WHERE id = $1
            AND user_id = $2
            RETURNING *
            `,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        res.json({
            success: true,
            message: "Resume deleted successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};