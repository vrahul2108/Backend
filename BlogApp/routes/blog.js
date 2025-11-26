const express = require('express');
const router = express.Router();


///imp controller
const {createComment} = require('../controllers/commentController');
const {dummyLike} = require('../controllers/likeContoller');
//mapping 
router.post('/comments/create', createComment );
router.get('/dummy',dummyLike);

//export
module.exports = router;