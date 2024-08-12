const checkTpcRole = (req, res, next) => {
  // Assuming `req.user` contains the decoded JWT payload with user details
  if (req.user && req.user[0].role === "tpc") {
    return next(); // User has TPC role, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }
};

export default checkTpcRole;