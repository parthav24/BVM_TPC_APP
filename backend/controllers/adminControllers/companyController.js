import sequelize from "../../config/database.js";
export const addCompany = async (req, res) => {
    try {
        const { name, role, resume, deadline } = req.body
        const new_deadline = new Date(deadline)
        await sequelize.transaction(async (t) => {

            await sequelize.query(
                `INSERT INTO company (name,role,resume,deadline)
                VALUES (?,?,?,?)`,
                {
                    replacements: [name, role, resume, new_deadline],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            )
            res.status(201).json({ success: true })
        });
    }
    catch (err) {
        res.status(501).json({ error: err.message });
    }
}

// Update company details
export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { deadline, visit_date, complete_date, no_of_students_placed } = req.body;

        // Convert dates to Date objects if they are provided
        const new_deadline = deadline ? new Date(deadline) : null;
        const new_visit_date = visit_date ? new Date(visit_date) : null;
        const new_complete_date = complete_date ? new Date(complete_date) : null;

        await sequelize.transaction(async (t) => {
            await sequelize.query(
                `UPDATE company
                 SET deadline = COALESCE(?, deadline),
                     visit_date = COALESCE(?, visit_date),
                     complete_date = COALESCE(?, complete_date),
                     no_of_students_placed = COALESCE(?, no_of_students_placed)
                 WHERE company_id = ?`,
                {
                    replacements: [
                        new_deadline,
                        new_visit_date,
                        new_complete_date,
                        no_of_students_placed,
                        id
                    ],
                    type: sequelize.QueryTypes.UPDATE,
                    transaction: t
                }
            );
            res.status(200).json({ success: true });
        });
    } catch (err) {
        res.status(501).json({ error: err.message });
    }
};