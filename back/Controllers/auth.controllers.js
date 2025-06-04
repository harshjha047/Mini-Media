const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");





exports.register = async (req, res) => {
    const { name, username, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const user = await User.create({ name, username, email, password: hash });
            let token = jwt.sign({ email }, "hehehe");
            res.cookie("token", token);
            res.status(201).json({ user });
        });
    });
    
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email }, "hehehe");
            res.cookie("token", token);

            res.status(200).json({ user });
        }
        else {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        
    });
}  
exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}








