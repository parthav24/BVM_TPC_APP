import sequelize from '../../config/database.js'

export const submitApplication = async (req, res) => {
    const { company_id, uid, roleIds } = req.body; // company_id and userId must be sent in the request body

    try {
        await sequelize.transaction(async (t) => {
            // Step 1: Check if the company requires a resume
            const [company] = await sequelize.query(
                `SELECT resume FROM company WHERE company_id = ?`,
                {
                    replacements: [company_id],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            );

            let resumePath = null;

            // Step 2: If the company requires a resume, handle the file upload
            // if (company.resume) {
            //     if (!req.file) {
            //         return res.status(400).json({ error: 'Resume is required for this application' });
            //     }
            //     // Multer saves the file to the specified directory
            //     resumePath = req.file.path; // Get file path from multer
            // }
            console.log(company_id, uid, resumePath,roleIds);

            // Step 3: Store the application along with the resume path in the application table
            const application = await sequelize.query(
                `INSERT INTO application (company_id, uid, resume) VALUES (?, ?, ?)`,
                {
                    replacements: [company_id, uid, resumePath],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );
            console.log(application);

            // let roleIds = [];
            // // temporary
            // const array_roles = roles.split(',');
            // for (const role of array_roles) {
            //     const roleId = await sequelize.query(
            //         `SELECT role_id FROM roles WHERE role_name = ?`,
            //         {
            //             replacements: [role],
            //             type: sequelize.QueryTypes.SELECT,
            //             transaction: t
            //         }
            //     )
            //     console.log(role, roleId);

            //     roleIds.push(roleId[0].role_id);
            // }

            for (const roleId of roleIds) {
                await sequelize.query(
                    `INSERT INTO application_roles (application_id,role_id)
                    VALUES (?,?)`,
                    {
                        replacements: [application[0], roleId],
                        type: sequelize.QueryTypes.INSERT,
                        transaction: t
                    }
                )
            }

            return res.status(201).json({ message: 'Application submitted successfully' });
        })

    } catch (error) {
        console.error('Error submitting application:', error);
        return res.status(500).json({ error: 'Error submitting application' });
    }
}