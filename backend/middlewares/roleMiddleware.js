import sequelize from '../config/database.js';

export const checkTpcRole = async (req, res, next) => {
  // Assuming `req.user` contains the decoded JWT payload with user details
  // Fetch the user from the database using the decoded UID
  if (req.user && req.user.role === "tpc") {
    return next(); // User has TPC role, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }
};
export const checkTpoRole = async (req, res, next) => {
  if (req.user && req.user.role === "tpo") {
    return next(); // User has TPO role, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }
};

export const checkStudentRole = async (req, res, next) => {
  if (req.user && req.user.role === "student") {
    return next(); // User has Student role, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }
};
export const checkTpcOrStudentRole = async(req,res,next)=>{
  if (req.user && (req.user.role === "student" || req.user.role === "tpc")) {
    console.log("CheckTPCOrStudent"+req.user.passout_year);
    return next(); // User has tpc or student role, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }
}
export const checkTpcOrTpoRole = async(req,res,next)=>{
  if (req.user && (req.user.role === "tpc" || req.user.role === "tpo")) {
    return next(); // User has tpc or tpo role, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }
}