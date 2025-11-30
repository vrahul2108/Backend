// const mongoose = require('mongoose');


// require('dotenv').config();

// exports.connect = ()=>{
//     mongoose.connect(process.env.PORT)
//     .then(()=>{
//         console.log('DB Connected');
//     })
//     .catch((e)=>{
//         console.log('DB connection failed');
//         process.exit(1);
//     })
// }

const mongoose = require('mongoose');
require('dotenv').config();

// The environment variable name should usually be MONGODB_URL or DB_URL, 
// but based on your file structure, I will assume you meant DATABASE_URL 
// for the connection string, and 'PORT' is reserved for the server port. 
// I have renamed the ENV variable for clarity, please ensure your .env file uses this.
// If your .env file used 'PORT' for the DB URI, change it to MONGODB_URL/DB_URL.
// If your environment variable is named something else, please update DB_URL above.

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