const { Telegraf, Scenes, session } = require("telegraf");
const { message } = require("telegraf/filters");
const { startWeatherUpdates } = require("./cron/weatherCron");
const { subscribeUser, unsubscribeUser } = require("./controllers/userController");
const { connectMongoDb } = require("./db/config");
require('dotenv').config();

// Initialize MongoDB database
connectMongoDb();

// Initialize the Telegram Bot
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

// Create a session to input location from the user on subscribing
const locationInput = new Scenes.BaseScene("location-input");
locationInput.enter(ctx => ctx.reply("Enter location"));
locationInput.on(message("text"), async ctx => {
    // Subscribe the user and save user details
    subscribeUser(ctx);
	return ctx.scene.leave();
});

const stage = new Scenes.Stage([locationInput]);
bot.use(stage.middleware());

// Handle '/start' command in bot
bot.start((ctx) => {
    ctx.reply(
        `🌟 Welcome to the Know My Weather Bot! 🌟\n\nHere's what I can do for you:\n` +
        `1️⃣ Provide daily weather updates.\n` +
        `2️⃣ Keep you informed about current weather in your location.\n\n` +
        `🌤 To start receiving updates, ensure you're subscribed.\n` +
        // `📍 Use /setlocation to update your location.\n` +
        `❌ Use /unsubscribe if you no longer wish to receive updates.\n` +
        `✅ Use /subscribe to re-enable updates.\n\n` +
        `Thank you for joining!`
    );
});

// Command to subscribe the user to weather updates
bot.command('subscribe', (ctx) => {
    ctx.scene.enter("location-input")
});

// Command to unsubscribe the user from weather updates
bot.command('unsubscribe', (ctx) => {
    unsubscribeUser(ctx);
});

// Start cron job to send weather updates periodically
startWeatherUpdates(bot);

// Start the bot
bot.launch();

console.log('Bot is running...');