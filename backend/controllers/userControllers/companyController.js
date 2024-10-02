import sequelize from "../../config/database.js";

export const getCompanyDetails = async (req, res) => {
    try {
        console.log(req.user);

        await sequelize.transaction(async (t) => {
            const company_data = await sequelize.query(
                `SELECT * FROM company WHERE batch_year = ?`,
                {
                    replacements: [req.user.passout_year],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            )

            res.status(200).json(company_data);
        })
    }
    catch (err) {
        console.log("Error in getCompanyDetails", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}