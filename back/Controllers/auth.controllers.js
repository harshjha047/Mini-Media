const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const handleError = (res, status, message) => {
  return res.status(status).json({ success: false, error: message });
};

exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return handleError(res, 400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleError(res, 409, "Email already in use");
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = await User.create({
          name,
          username,
          email,
          password: hash,
        });
        const token = jwt.sign({ email }, process.env.JWT_SECRET || "hehehe");
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ success: true, user });
      });
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    return handleError(res, 500, "Server error during registration");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleError(res, 400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return handleError(res, 401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return handleError(res, 401, "Invalid email or password");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET || "hehehe");
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Login error:", err.message);
    return handleError(res, 500, "Server error during login");
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    return handleError(res, 500, "Logout failed");
  }
};
