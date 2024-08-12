import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';

export const register = async (req, res) => {
    const { uid, dept_id, role, f_name, m_name, l_name, dob, gender, email, mobile, address, password, passout_year, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, ssc_percentage, hsc_percentage, diploma_cpi, no_active_backlog, no_dead_backlog } = req.body;
    const new_dob = new Date(dob).toISOString().slice(0, 10);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await sequelize.transaction(async (t) => {
            // Insert into users table
            await sequelize.query(
                `INSERT INTO pending_users (uid, dept_id, role, f_name, m_name, l_name, dob,gender, email, mobile, address, password, passout_year) 
                VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)`,
                {
                    replacements: [uid, dept_id, role, f_name, m_name, l_name, new_dob, gender, email, mobile, address, hashedPassword, passout_year],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );

            // Insert into result table
            const cpi = (sem1 + sem2 + sem3 + sem4) / 4;
            await sequelize.query(
                `INSERT INTO pending_results (id, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, cpi, ssc_percentage, hsc_percentage, diploma_cpi, no_active_backlog, no_dead_backlog) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                {
                    replacements: [uid, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, cpi, ssc_percentage, hsc_percentage, diploma_cpi, no_active_backlog, no_dead_backlog],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};


export const login = async (req, res) => {
    const { uid, password } = req.body;

    try {
        // Fetch the user with the given uid and role
        const user = await sequelize.query(
            `SELECT * FROM users WHERE uid = ?`,
            {
                replacements: [uid],
                type: sequelize.QueryTypes.SELECT,
            }
        );

        // Check if the user exists
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { uid: user[0].uid, role: user[0].role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        // If the password matches, proceed with login
        res.status(200).json({ message: 'Login successful', user: user[0], token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};