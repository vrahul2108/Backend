const express = require('express');
const router = express.Router();

// FIX: Corrected the import names to match the exports from controllers/Auth.js
// The controller exports 'login' and 'signUp' (with capital 'S' and 'U')
const { login, signUp } = require('../controllers/Auth');

const {auth, isStudent, isAdmin} = require('../middleware/auth');

// The second error (argument handler must be a function) was caused here:
// You were importing { login, signup } but the controller exports { login, signUp }
router.post('/login', login);
router.post('/signUp', signUp); // FIX: Changed 'signup' to 'signUp'

///testing protected routes for single mw

router.get('/test', auth, (req, res)=>{
    res.json({
        success : true,
        message: 'Testing proted routes',
    });
})

//protected routes

router.get('/student', auth, isStudent, (req, res)=>{
    res.json({
        success: true,
        message : 'Protected route for Student',
    })
})

router.get('/admin', auth, isAdmin, (req, res)=>{
    res.json({
        success: true,
        message : 'Protected route for Admin',
    })
})

module.exports = router;