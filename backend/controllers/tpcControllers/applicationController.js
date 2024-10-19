import sequelize from "../../config/database.js";
import { addPlacementData } from "./placementController.js";

export const moveNextRound = async (req, res) => {
    try {
        const { application_id } = req.body;
        await sequelize.transaction(async (t) => {
            await sequelize.query(
                `UPDATE application 
                SET round_reached = round_reached+1 
                WHERE application_id= ?`,
                {
                    replacements: [application_id],
                    type: sequelize.QueryTypes.UPDATE,
                    transaction: t
                }
            )
        });
        res.status(200).json({ message: "Congratulations for clearing round" });
    }
    catch (err) {
        console.log("Error in moveNextRound", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const rejectCandidate = async (req, res) => {
    try {
        const { application_id } = req.body;
        await sequelize.transaction(async (t) => {
            await sequelize.query(
                `UPDATE application 
                SET status = 'rejected' 
                WHERE application_id = ?`,
                {
                    replacements: [application_id],
                    type: sequelize.QueryTypes.UPDATE,
                    transaction: t
                }
            )
        });
        res.status(200).json({ message: "Unfortunately, you will not be moving to the next round of interviews." })
    } catch (err) {
        console.log("Error in rejectCandidate", err.message);
        res.status(500).json({ message: "Internal Server Error" })
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


