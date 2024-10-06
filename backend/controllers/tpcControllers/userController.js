import sequelize from "../../config/database.js";

export const getApprovedCandidates = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            console.log(req.user);

            const approved_students = await sequelize.query(
                `SELECT * FROM students JOIN result ON students.uid=result.id`,
                {
                    replacements: [],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            )

            res.status(200).json({ approved_students });
        })
    } catch (err) {
        console.log('Error in getApprovedStudents', err.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const getPendingCandidates = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            console.log(req.user);

            const pending_students = await sequelize.query(
                `SELECT * FROM pending_students JOIN pending_results ON pending_students.uid=pending_results.id`,
                {
                    replacements: [],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            )

            res.status(200).json({ pending_students });
        })
    } catch (err) {
        console.log('Error in getPendingStudents', err.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


