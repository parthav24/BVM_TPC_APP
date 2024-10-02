import sequelize from '../config/database.js';

export const checkTpcRole = async (req, res, next) => {
  // Assuming `req.user` contains the decoded JWT payload with user details
  // Fetch the user from the database using the decoded UID
  const user_data = await sequelize.query(
    'SELECT uid, f_name, m_name, l_name, email, role, dept_id,passout_year FROM tpc WHERE uid = ?',
    {
      replacements: [req.user.uid],
      type: sequelize.QueryTypes.SELECT,
    }
  );
  req.user = user_data[0];
  if (req.user && req.user.role === "tpc") {
    return next(); // User has TPC role, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }
};
export const checkTpoRole = async (req, res, next) => {
  const user_data = await sequelize.query(
    'SELECT uid, f_name, m_name, l_name, email,mobile,role  FROM tpo WHERE uid = ?',
    {
      replacements: [req.user.uid],
      type: sequelize.QueryTypes.SELECT,
    }
  );
  req.user = user_data[0];
  if (req.user && req.user.role === "tpo") {
    return next(); // User has TPO role, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }
};

export const checkStudentRole = async (req, res, next) => {
  const user_data = await sequelize.query(
    'SELECT uid, f_name, m_name, l_name, email,address,mobile,dept_id,gender,role,passout_year  FROM students WHERE uid = ?',
    {
      replacements: [req.user.uid],
      type: sequelize.QueryTypes.SELECT,
    }
  );
  req.user = user_data[0];
  if (req.user && req.user.role === "student") {
    return next(); // User has Student role, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }
};
