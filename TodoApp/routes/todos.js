const express = require('express');
 const router = express.Router();

 //importing the controller

 const {createTodo} = require('../controllers/createTodo');
 const {getTodo} = require('../controllers/getTodo');

 //definfing the api routes
 router.post('/createTodo', createTodo);
 router.get('/getTodo', getTodo);

 module.exports = router;