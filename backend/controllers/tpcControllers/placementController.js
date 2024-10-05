import sequelize from "../../config/database.js";

export const addPlacementData = async (req, res) => {
    try {
        const { uid, company_id, CTC } = req.body;
        await sequelize.transaction(async (t) => {
            await sequelize.query(
                `INSERT INTO placement_data (uid,company_id,package)
                VALUES (?,?,?)`,
                {
                    replacements: [uid, company_id, CTC],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            )
            res.status(201).json({ message: "Inserted into Placement Data" });
        })
    } catch (err) {
        console.log("Error in addPlacementData", err.message);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

export const getPlacementData = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const placement_data = await sequelize.query(
                `SELECT s.f_name,s.l_name,d.dept_name,p.package,c.name as company_name FROM
                placement_data p JOIN students s ON p.uid = s.uid 
                JOIN company c ON p.company_id = c.company_id
                JOIN department d ON s.dept_id = d.dept_id`,
                {
                    replacements: [],
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            )
            res.status(200).json({ placement_data });
        })
    } catch (err) {
        console.log("Error in getPlacementData", err.message);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}