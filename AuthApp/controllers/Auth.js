const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    try{
        //data fetch
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details',
            })
        }
        //user registered or not
        let user = await User.findOne({email});
        //if not reg

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'user id not reg',
            })
        }

        const payload = {
            email : user.email,
            role : user.role,
            id : user._id,
        }
        //validating password & token generation
        if (await bcrypt.compare(password, user.password)) {
            // Success Block
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            console.log(user);
            
            // ... (rest of the cookie setting and response remains the same) ...
            user = user.toObject();
              
            user.token = token;
           console.log(user);
            user.password = undefined; // IMPORTANT: Remove password before sending user object
            console.log(user);
            const options = {
                // FIX: Corrected Date object syntax
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
                httpOnly: true,
            };

            return res.cookie("token", token, options).status(200).json({ // Use return here
                success: true,
                user,
                token,
                message: 'User logged in successfully'
            });

        } else {
            // Failure Block: Password does NOT match
            return res.status(401).json({ // 401 Unauthorized is appropriate
                success: false,
                message: 'Invalid password',
            });
        }

    }
    catch(e){
        return res.status(500).json({
            success: false,
            message:'Login Failure',
        })
    }
};