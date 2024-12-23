import sequelize from "../../config/database.js";

export const getTpcProfile = async (req, res) => {
    try {
        // Return user data
        await sequelize.transaction(async (t) => {
            const tpcData = await sequelize.query(
                `SELECT * FROM tpc JOIN department ON tpc.dept_id=department.dept_id WHERE uid = ?`,
                {
                    replacements: [req.user.uid],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            )
            console.log(tpcData[0]);
            res.status(200).json({ tpcData: tpcData[0] });
        })
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user data', error: err.message });
    }
};
export const getTpcMembers = async (req, res) => {
    try {
        console.log("Hello");
        console.log(req.user.dept_id);
        
        // Return user data
        await sequelize.transaction(async (t) => {
            const tpcMembersData = await sequelize.query(
                `SELECT * FROM tpc WHERE dept_id = ?`,
                {
                    replacements: [req.user.dept_id],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            )
            console.log(tpcMembersData);
            res.status(200).json({ tpcMembersData: tpcMembersData });
        })
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user data', error: err.message });
    }
};
export const getTpoName = async (req, res) => {
    try {
        // Return user data
        await sequelize.transaction(async (t) => {
            const tpoData = await sequelize.query(
                `SELECT * FROM tpo`,
                {
                    replacements: [],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            )
            // console.log(tpoData[0]);
            res.status(200).json({ tpoData: tpoData[0] });
        })
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user data', error: err.message });
    }
};

