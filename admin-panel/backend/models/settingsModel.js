const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const settingsSchema = new mongoose.Schema({
    weatherApiKey: { type: String },
    telegramToken: { type: String },
});

module.exports = mongoose.model("Settings", settingsSchema);