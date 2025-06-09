const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "hehehe");
    req.user = decoded; // Attach decoded user info (like email) to req
    next();
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid token." });
  }
};

module.exports = verifyToken;
