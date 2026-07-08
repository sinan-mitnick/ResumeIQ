const pool = require("../db/db");

exports.getProfile = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT id,name,email,created_at
             FROM users
             WHERE id=$1`,

            [req.user.id]

        );

        if(result.rows.length===0){

            return res.status(404).json({

                success:false,

                message:"User not found"

            });

        }

        res.status(200).json({

            success:true,

            user:result.rows[0]

        });

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};