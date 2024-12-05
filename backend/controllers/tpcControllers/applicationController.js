import sequelize from "../../config/database.js";
import { addPlacementData } from "./placementController.js";

export const handleCandidatesRound = async (req, res) => {
    try {
        const { moveToNextRound, rejectForCurrentRound } = req.body;
        console.log(moveToNextRound);

        // Validation: Ensure both arrays are provided
        if (!Array.isArray(moveToNextRound) || !Array.isArray(rejectForCurrentRound)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        await sequelize.transaction(async (t) => {
            // Move candidates to the next round
            if (moveToNextRound.length > 0) {
                await sequelize.query(
                    `UPDATE application 
                     SET round_reached = round_reached + 1 
                     WHERE application_id IN (?)`,
                    {
                        replacements: [moveToNextRound],
                        type: sequelize.QueryTypes.UPDATE,
                        transaction: t,
                    }
                );
            }

            // Reject candidates for the current round
            if (rejectForCurrentRound.length > 0) {
                await sequelize.query(
                    `UPDATE application 
                     SET status = 'rejected' 
                     WHERE application_id IN (?)`,
                    {
                        replacements: [rejectForCurrentRound],
                        type: sequelize.QueryTypes.UPDATE,
                        transaction: t,
                    }
                );
            }
        });

        res.status(200).json({ message: "Round update completed successfully" });
    } catch (err) {
        console.error("Error in handleRoundCandidates", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getLastRoundStudents = async (req, res) => {
    try {
        const { company_id } = req.query;
        await sequelize.transaction(async (t) => {
            const lastRoundData = await sequelize.query(
                `SELECT * FROM application JOIN students ON application.uid = students.uid WHERE status = 'pending' AND company_id = ?`,
                {
                    replacements: [company_id],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            );
            res.status(200).json(lastRoundData);
        })
    } catch (err) {
        console.error("Error in handleRoundCandidates", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getApplicationData = async (req, res) => {
    try {
        const { company_id } = req.query;
        await sequelize.transaction(async (t) => {
            const applicationData = await sequelize.query(
                `SELECT * FROM application JOIN students ON application.uid = students.uid WHERE company_id = ?`,
                {
                    replacements: [company_id],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            );

            console.log(applicationData);

            res.status(200).json(applicationData);
        })
    } catch (err) {
        console.error("Error in handleRoundCandidates", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const completeDrive = async (req, res) => {
    try {
        const { moveToNextRound, rejectForCurrentRound } = req.body;
        console.log(moveToNextRound);

        // Validation: Ensure both arrays are provided
        if (!Array.isArray(moveToNextRound) || !Array.isArray(rejectForCurrentRound)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        await sequelize.transaction(async (t) => {
            // select candidates 
            if (moveToNextRound.length > 0) {
                await sequelize.query(
                    `UPDATE application 
                     SET status = 'accepted' 
                     WHERE application_id IN (?)`,
                    {
                        replacements: [moveToNextRound],
                        type: sequelize.QueryTypes.UPDATE,
                        transaction: t,
                    }
                );
            }

            // Reject candidates for the current round
            if (rejectForCurrentRound.length > 0) {
                await sequelize.query(
                    `UPDATE application 
                     SET status = 'rejected' 
                     WHERE application_id IN (?)`,
                    {
                        replacements: [rejectForCurrentRound],
                        type: sequelize.QueryTypes.UPDATE,
                        transaction: t,
                    }
                );
            }
        });

        res.status(200).json({ message: "students selected successfully" });
    } catch (err) {
        console.error("Error in complete drive", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const selectCandidate = async (req, res) => {
    try {
        const { application_id } = req.body;
        await sequelize.transaction(async (t) => {
            await sequelize.query(
                `UPDATE application 
                SET status = 'accepted' 
                WHERE application_id = ?`,
                {
                    replacements: [application_id],
                    type: sequelize.QueryTypes.UPDATE,
                    transaction: t
                }
            )
        });
        res.status(200).json({ message: "Congratulations for getting placed." })
    } catch (err) {
        console.log("Error in selectCandidate", err.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getSelectedCandidates = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            console.log(req.user);

            const placed_data = await sequelize.query(
                `SELECT * FROM company 
                JOIN application ON company.company_id = application.company_id
                JOIN students ON application.uid = students.uid
                JOIN department ON students.dept_id = department.dept_id 
                WHERE application.status='accepted' AND students.dept_id=? AND company.batch_year = ? AND application.uid NOT IN 
                (SELECT uid FROM placement_data)`,
                {
                    replacements: [req.user.dept_id, req.user.passout_year,],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            )

            res.status(200).json({ placed_data });
        })
    } catch (err) {
        console.log('Error in getAcceptedStudents', err.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


