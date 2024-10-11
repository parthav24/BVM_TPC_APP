import sequelize from "../../config/database.js";

export const getApprovedCandidates = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            console.log(req.user);

            const approved_students = await sequelize.query(
                `SELECT * FROM students JOIN result ON students.uid=result.id WHERE dept_id=?`,
                {
                    replacements: [req.user.dept_id],
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

export const editCandidateDetails = async (req, res) => {
    const userData  = req.body;
    console.log(userData);
    console.log(req.body);
    
    try {
        // Start a transaction
        await sequelize.transaction(async (t) => {
            // Fetch the user from the pending_users table
            const pending_user = await sequelize.query(
                `SELECT * FROM pending_students WHERE uid = ?`,
                {
                    replacements: [userData.uid],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            );

            // Check if the user exists in the pending_users table
            if (pending_user.length === 0) {
                return res
                    .status(404)
                    .json({ message: "User not found in pending users" });
            }

            // Insert the user into the users table
            await sequelize.query(
                `UPDATE pending_students 
             SET dept_id = ?,  
                 f_name = ?, 
                 m_name = ?, 
                 l_name = ?, 
                 dob = ?, 
                 gender = ?, 
                 email = ?, 
                 mobile = ?, 
                 address = ?, 
                 passout_year = ? 
             WHERE uid = ?`,
                {
                    replacements: [
                        userData.dept_id,
                        userData.f_name,
                        userData.m_name,
                        userData.l_name,
                        new Date(userData.dob).toISOString().slice(0, 10),
                        userData.gender,
                        userData.email,
                        userData.mobile,
                        userData.address,
                        userData.passout_year,
                        userData.uid, // Make sure to include the uid at the end for the WHERE clause
                    ],
                    type: sequelize.QueryTypes.UPDATE,
                    transaction: t,
                }
            );

            // Fetch the user's results from the pending_results table
            const pendingResult = await sequelize.query(
                `SELECT * FROM pending_results WHERE id = ?`,
                {
                    replacements: [userData.uid],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            );

            // Check if the result exists in the pending_results table
            if (pendingResult.length === 0) {
                return res
                    .status(404)
                    .json({ message: "Result not found in pending results" });
            }
            const calculateAverageSPI = () => {
                const { sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, diploma_cpi } = userData;

                const sems = [sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8].filter(spi => spi !== null);

                // If diploma_cpi is provided, treat it as sem1 and sem2
                if (diploma_cpi !== null) {
                    sems.unshift(diploma_cpi); // Add diploma_cpi to the start
                    sems.unshift(diploma_cpi); // Add it again for the second semester
                }

                // Calculate average
                const total = sems.reduce((acc, curr) => acc + curr, 0);
                const average = sems.length > 0 ? total / sems.length : 0;

                return average;
            };
            userData.cpi = calculateAverageSPI();

            // Insert the user's results into the results table
            await sequelize.query(
                `UPDATE pending_results 
             SET sem1 = ?, 
                 sem2 = ?, 
                 sem3 = ?, 
                 sem4 = ?, 
                 sem5 = ?, 
                 sem6 = ?, 
                 sem7 = ?, 
                 sem8 = ?, 
                 cpi = ?, 
                 ssc_percentage = ?, 
                 hsc_percentage = ?, 
                 diploma_cpi = ?, 
                 no_active_backlog = ?, 
                 no_dead_backlog = ? 
             WHERE id = ?`,
                {
                    replacements: [
                        userData.sem1,
                        userData.sem2,
                        userData.sem3,
                        userData.sem4,
                        userData.sem5,
                        userData.sem6,
                        userData.sem7,
                        userData.sem8,
                        userData.cpi,
                        userData.ssc_percentage,
                        userData.hsc_percentage,
                        userData.diploma_cpi,
                        userData.no_active_backlog,
                        userData.no_dead_backlog,
                        userData.uid, // Include the id for the WHERE clause
                    ],
                    type: sequelize.QueryTypes.UPDATE,
                    transaction: t,
                }
            );
        });

        res
            .status(200)
            .json({ message: "User data updated" });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error in edit user data", error: err.message });
    }
}


