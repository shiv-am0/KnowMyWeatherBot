const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if(!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        } 
        const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).json({ token });
    } catch(error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { login };