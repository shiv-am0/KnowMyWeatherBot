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
        const { isBlocked } = req.body;
        console.log(chatId);
        const user = await User.findOneAndUpdate({ chatId }, { isBlocked: isBlocked }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error blocking user" });
    }
};

module.exports = { getUsers, blockUser };