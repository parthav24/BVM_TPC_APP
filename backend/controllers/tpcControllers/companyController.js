import sequelize from "../../config/database.js";
export const addCompany = async (req, res) => {
    try {
        const {
            name,
            role,
            resume,
            deadline,
            roles,
            req_CPI,
            max_active_backlogs,
            max_dead_backlogs,
            batch_year } = req.body

        const new_deadline = new Date(deadline)
        console.log(name, JSON.parse(role), resume, deadline, roles, req.file.path);

        await sequelize.transaction(async (t) => {

            const company = await sequelize.query(
                `INSERT INTO company (name,role,resume,deadline,company_JD,batch_year,req_CPI,max_active_backlogs,max_dead_backlogs)
                VALUES (?,?,?,?,?,?,?,?,?)`,
                {
                    replacements: [
                        name,
                        JSON.parse(role),
                        JSON.parse(resume),
                        new_deadline,
                        req.file.path,
                        Number(batch_year),
                        Number(req_CPI) || null,
                        Number(max_active_backlogs) || null,
                        Number(max_dead_backlogs) || null
                    ],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            )

            let roleIds = JSON.parse(roles);
            for (const roleId of roleIds) {
                await sequelize.query(
                    `INSERT INTO company_roles (company_id,role_id)
                    VALUES (?,?)`,
                    {
                        replacements: [company[0], roleId],
                        type: sequelize.QueryTypes.INSERT,
                        transaction: t
                    }
                )
            }
            res.status(201).json({ success: true })
        });
    }
    catch (err) {
        console.log(err.message);

        res.status(501).json({ error: err.message });
    }
}

// Update company details
export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { deadline, visit_date, complete_date, no_of_students_placed, req_CPI, max_active_backlogs, max_dead_backlogs } = req.body;

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
                     no_of_students_placed = COALESCE(?, no_of_students_placed),
                     req_CPI = COALESCE(?, req_CPI),
                     max_active_backlogs = COALESCE(?,max_active_backlogs),
                     max_dead_backlogs = COALESCE(?, max_dead_backlogs)
                 WHERE company_id = ?`,
                {
                    replacements: [
                        new_deadline,
                        new_visit_date,
                        new_complete_date,
                        no_of_students_placed || null,
                        req_CPI || null,
                        max_active_backlogs || null,
                        max_dead_backlogs || null,
                        id
                    ],
                    type: sequelize.QueryTypes.UPDATE,
                    transaction: t
                }
            );
            res.status(200).json({ success: true });
        });
    } catch (err) {
        console.log(err.message);

        res.status(501).json({ error: err.message });
    }
};