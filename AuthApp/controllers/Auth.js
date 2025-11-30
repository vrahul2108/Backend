const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Added for potential login use

// Function for User Sign Up (Note the capital 'S' and 'U')
exports.signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Check if user already exists (FIX: changed 'mail' to 'email')
        const exisUser = await User.findOne({ email });

        if (exisUser) {
            return res.status(400).json({
                message: 'User already exists',
                success: false,
            });
        }

        // 2. Hash Password (FIX: declared hashPass outside the try block)
        let hashPass;
        try {
            hashPass = await bcrypt.hash(password, 10);
        } catch (e) {
            return res.status(500).json({ // Use return here to stop execution
                success: false,
                message: 'Error in hashing password'
            });
        }

        // 3. Create new user in DB
        const user = await User.create({
            name, email, password: hashPass, role
        });

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: user // Optionally return user data (excluding password)
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ // Use return here to stop execution
            success: false,
            message: 'User registration failed. Please try again later.' // More accurate message
        });
    }
};

// Placeholder for Login function (to resolve the missing 'login' import in user.js)
exports.login = async (req, res) => {
    return res.status(501).json({
        success: false,
        message: 'Login route not yet implemented.'
    });
};