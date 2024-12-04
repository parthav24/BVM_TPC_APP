import sequelize from "../../config/database.js";

export const getTpcMembers = async (req, res) => {
    try {
        console.log("Hello");
        
        // Return user data
        await sequelize.transaction(async (t) => {
            const tpcMembersData = await sequelize.query(
                `SELECT f_name,l_name,mobile,email,dept_id FROM tpc`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            )
            console.log("tpc members",tpcMembersData);
            
            res.status(200).json({ tpcMembersData: tpcMembersData });
        })
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user data', error: err.message });
    }
};