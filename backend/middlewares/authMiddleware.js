import jwt from 'jsonwebtoken';
import sequelize from '../config/database.js';
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // console.log(process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        console.log(decoded);
        // Fetch the user from the database using the decoded UID
        req.user = await sequelize.query(
            'SELECT uid, f_name, m_name, l_name, email, role, dept_id FROM users WHERE uid = ?',
            {
                replacements: [decoded.uid],
                type: sequelize.QueryTypes.SELECT,
            }
        );

        next();
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

export default authMiddleware;