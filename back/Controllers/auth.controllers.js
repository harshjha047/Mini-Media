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

exports.toggleFollow = async (req, res) => {
  try {
    const currentUser = await User.findOne({ email: req.user.email });
    const targetUserId = req.params.id;

    if (!currentUser) return res.status(401).json({ message: "Unauthorized" });
    if (currentUser._id.toString() === targetUserId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUser._id);
    } else {
      // Follow
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUser._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      following: !isFollowing,
      message: isFollowing ? "User unfollowed" : "User followed",
    });

  } catch (err) {
    console.error("Follow error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
