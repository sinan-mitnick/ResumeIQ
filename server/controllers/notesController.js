const pool = require("../db/db");

// Save or Update Notes
exports.saveNotes = async (req, res) => {

    try {

        const {
            resumeId,
            companyName,
            interviewDate,
            applicationStatus,
            notes,
        } = req.body;

        const existing = await pool.query(

            "SELECT * FROM resume_notes WHERE resume_id=$1",

            [resumeId]

        );

        if (existing.rows.length > 0) {

            await pool.query(

                `UPDATE resume_notes
                 SET company_name=$1,
                     interview_date=$2,
                     application_status=$3,
                     notes=$4,
                     updated_at=NOW()
                 WHERE resume_id=$5`,

                [
                    companyName,
                    interviewDate,
                    applicationStatus,
                    notes,
                    resumeId,
                ]

            );

        } else {

            await pool.query(

                `INSERT INTO resume_notes
                (
                    resume_id,
                    company_name,
                    interview_date,
                    application_status,
                    notes
                )
                VALUES($1,$2,$3,$4,$5)`,

                [
                    resumeId,
                    companyName,
                    interviewDate,
                    applicationStatus,
                    notes,
                ]

            );

        }

        res.json({

            success: true,
            message: "Notes saved successfully",

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message,

        });

    }

};

// Load Notes
exports.getNotes = async (req, res) => {

    try {

        const { resumeId } = req.params;

        const result = await pool.query(

            "SELECT * FROM resume_notes WHERE resume_id=$1",

            [resumeId]

        );

        res.json({

            success: true,
            notes: result.rows[0] || null,

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message,

        });

    }

};