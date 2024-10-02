import jwt from 'jsonwebtoken';
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
        next();
    } catch (err) {
        console.log("Error in auth middleware",err.message);
        res.status(401).json({ error: "Unauthorized access" });
    }
};

export default authMiddleware;