const User = require("../models/userModel");

// Function to subscribe a user to weather updates
const subscribeUser = async (ctx) => {
  const chatId = ctx.chat.id;
  const location = ctx.message.text;

  try {
    const existingUser = await User.findOne({ chatId });

    if (existingUser) {
      // If user exists, check subscription status
      if (existingUser.isSubscribed && existingUser.location == location) {
        ctx.reply("You are already subscribed to weather updates.");
      } else if (existingUser.isSubscribed && existingUser.location != location) {
        existingUser.isSubscribed = true;
        existingUser.location = location; // Update location if provided
        await existingUser.save();
        ctx.reply(
          `You have successfully subscribed to weather updates for ${location}!`
        );
      }
    } else {
      // If user does not exist, create a new user
      await User.create({ chatId, isSubscribed: true, location });
      ctx.reply(
        `You have successfully subscribed to weather updates for ${location}.`
      );
    }
  } catch (error) {
    console.error(error);
    ctx.reply("There was an error subscribing.");
  }
};

// Function to unsubscribe a user from weather updates
const unsubscribeUser = async (ctx) => {
  const chatId = ctx.chat.id;
  try {
    await User.findOneAndUpdate({ chatId }, { isSubscribed: false });
    ctx.reply("You have successfully unsubscribed from weather updates.");
  } catch (error) {
    console.error(error);
    ctx.reply("There was an error unsubscribing.");
  }
};

module.exports = { subscribeUser, unsubscribeUser };
