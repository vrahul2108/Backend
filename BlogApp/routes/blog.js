const express = require('express');
const router = express.Router();


///imp controller
const {createComment} = require('../controllers/commentController');

//mapping 
router.post('/comments/create', createComment );

//export
module.exports = router;