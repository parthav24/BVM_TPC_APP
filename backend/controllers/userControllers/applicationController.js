import sequelize from '../../config/database.js'

export const submitApplication = async (req, res) => {
    const { company_id, uid, roles } = req.body; // company_id and userId must be sent in the request body

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
            if (company.resume) {
                if (!req.file) {
                    return res.status(400).json({ error: 'Resume is required for this application' });
                }
                // Multer saves the file to the specified directory
                resumePath = req.file.path; // Get file path from multer
            }
            console.log(company_id, uid, resumePath, roles);

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

            for (const roleId of JSON.parse(roles)) {
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

export const getAllApplications = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            // Step 1: Check if the company requires a resume
            console.log("get all application");

            const allApplications = await sequelize.query(
                `SELECT C.name,A.round_reached,A.status,A.createdAt FROM application A JOIN company C ON A.company_id=C.company_id WHERE uid = ?`,
                {
                    replacements: [req.user.uid],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            );
            return res.status(201).json({ allApplications });
        });

    } catch (error) {
        console.error('Error fetching application:', error);
        return res.status(500).json({ error: 'Error fetching application' });
    }
}