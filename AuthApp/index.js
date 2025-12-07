const express = require('express');
const app = express();
// Load environment variables from .env file
require('dotenv').config();

// Define PORT using environment variable or a default value
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON body requests
app.use(express.json());


//cookie-parser

const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Connect to the database
// The 'connect' function is exported from the database config file
require('./config/database').connect();

// Import and mount user routes
const user = require('./routes/user');
// All routes defined in user.js will be prefixed with /api/v1
app.use('/api/v1', user);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
});