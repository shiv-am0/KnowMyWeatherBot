const cron = require('node-cron');
const User = require('../models/userModel');
const { getWeatherUpdates } = require('../services/weatherService');

// Start cron job to send weather updates
const startWeatherUpdates = async (bot) => {
    // Cron expression
    cron.schedule('00 18 * * *', async () => {
        console.log("Cron initiated...");
        const subscribedUsers = await User.find({ isSubscribed: true });

        // Return if no users are present
        if (!subscribedUsers.length) {
            console.log("No users found");
            return;
        }

        // Get weather updates for each user based on their location
        for (let user of subscribedUsers) {
            // Inform user if they are blocked and move to next user
            if(user.isBlocked) {
                console.log(`User ${user.chatId} is blocked`);
                bot.telegram.sendMessage(user.chatId, "Looks like you have been blocked. Please contact the admin.");
                continue;
            }

            // Get weather updates for unblocked users
            const updates = await getWeatherUpdates(user.location);
            console.log(updates);
            bot.telegram.sendMessage(user.chatId, updates);
        }
    });
};

module.exports = { startWeatherUpdates };
