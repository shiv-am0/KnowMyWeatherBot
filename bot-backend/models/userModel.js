const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  chatId: { type: Number, required: true, unique: true },
  isSubscribed: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  location: { type: String, default: ''},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
