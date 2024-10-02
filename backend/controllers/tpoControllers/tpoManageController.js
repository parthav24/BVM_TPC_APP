import bcrypt from 'bcrypt';
import sequelize from '../../config/database.js';

export const tpoRegister = async (req, res) => {
    const { uid, role, f_name, m_name, l_name, gender, email, mobile, password, office_location } = req.body;

    try {
        console.log(uid, role, f_name, m_name, l_name, gender, email, mobile, password, office_location);

        const hashedPassword = await bcrypt.hash(password, 10);

        await sequelize.transaction(async (t) => {
            // Insert into users table
            await sequelize.query(
                `INSERT INTO tpo (uid, role, f_name, m_name, l_name, gender, email, mobile, password, office_location) 
                VALUES (?, ?, ?, ?, ?, ?,?, ?, ?,?)`,
                {
                    replacements: [uid, role, f_name, m_name, l_name, gender, email, mobile, hashedPassword, office_location],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );
        });
        res.status(201).json({ message: 'TPO registered successfully' });
    } catch (err) {
        console.log("Error in tpo register", err.message);
        res.status(500).json({ message: 'Error registering tpo', error: err.message });
    }
}