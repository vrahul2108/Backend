

const mongoose = require('mongoose');
require('dotenv').config();


exports.connect = () => {
    // Corrected connection logic: mongoose is the object itself, not a function to be called.
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database Connected Successfully');
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        // Exit process if connection fails
        process.exit(1);
    });
};