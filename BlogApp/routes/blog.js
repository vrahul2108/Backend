const express = require('express');
const router = express.Router();


///imp controller
const {createComment} = require('../controllers/commentController');
const {dummyLike} = require('../controllers/likeContoller');
const {createPost} = require('../controllers/postController');
const {getAllPost} =require('../controllers/postController');

//mapping 
router.post('/comments/create', createComment );
router.get('/dummy',dummyLike);
router.post('/post/create', createPost);
router.get('/posts', getAllPost);

//export
module.exports = router;