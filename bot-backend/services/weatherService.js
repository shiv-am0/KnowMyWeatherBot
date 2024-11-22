const axios = require("axios");

// Function to get weather updates
async function getWeatherUpdates(location) {
    try {
        const weatherData = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location},uk&APPID=${process.env.WEATHER_API_KEY}`);
        const weatherMessage = `🌤 Current weather in ${location}:\n🌡 Temperature: ${weatherData.data.main.temp}K\n🌡 Minimum Temperature today: ${weatherData.data.main.temp_min}K\n🌡 Maximum Temperature today: ${weatherData.data.main.temp_max}K\n🌪 Weather: ${weatherData.data.weather[0].description}`;
        return weatherMessage;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return "Unable to fetch weather data. Sorry for the inconvinience!"
    }
};

module.exports = { getWeatherUpdates };