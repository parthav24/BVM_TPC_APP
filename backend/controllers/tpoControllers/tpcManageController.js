import bcrypt from 'bcrypt';
import sequelize from '../../config/database.js';

export const tpcRegister = async (req, res) => {
    const { uid, role, f_name, m_name, l_name, gender, email, mobile, password, dept_id, passout_year } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await sequelize.transaction(async (t) => {
            // Insert into tpc table
            await sequelize.query(
                `INSERT INTO tpc (uid, role,f_name, m_name, l_name, gender, email, mobile, password, dept_id,passout_year) 
                VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?,?)`,
                {
                    replacements: [uid, role, f_name, m_name, l_name, gender, email, mobile, hashedPassword, dept_id, passout_year],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );
        });
        res.status(201).json({ message: 'TPC registered successfully' });
    } catch (err) {
        console.log("Error in tpc register", err.message);
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
}