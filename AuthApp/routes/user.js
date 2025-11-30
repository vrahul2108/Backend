const express = require('express');
const router = express.Router();

// FIX: Corrected the import names to match the exports from controllers/Auth.js
// The controller exports 'login' and 'signUp' (with capital 'S' and 'U')
const { login, signUp } = require('../controllers/Auth');

// The second error (argument handler must be a function) was caused here:
// You were importing { login, signup } but the controller exports { login, signUp }
router.post('/login', login);
router.post('/signUp', signUp); // FIX: Changed 'signup' to 'signUp'

module.exports = router;