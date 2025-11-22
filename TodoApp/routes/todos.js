const express = require('express');
 const router = express.Router();

 //importing the controller

 const {createTodo} = require('../controllers/createTodo');

 //definfing the api routes
 router.post('/createTodo', createTodo);

 module.exports = router;