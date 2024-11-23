const User = require("../models/userModel");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

const blockUser = async (req, res) => {
    try {
        const { chatId } = req.params;
        const user = await User.findByIdAndUpdate(chatId, { isBlocked: true }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error blocking user" });
    }
};

module.exports = { getUsers, blockUser };