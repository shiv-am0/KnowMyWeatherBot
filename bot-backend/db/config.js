const mongoose = require('mongoose');

// MongoDB Connection
const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } 
}

module.exports = { connectMongoDb };