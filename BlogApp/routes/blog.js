const express = require('express');
const router = express.Router();


///imp controller
const {createComment} = require('../controllers/commentController');
const {dummyLike} = require('../controllers/likeContoller');
const {createPost} = require('../controllers/postController');
const {getAllPost} =require('../controllers/postController');
const {likePost, unlikePost} = require('../controllers/likeContoller');

//mapping 
router.post('/comments/create', createComment );
router.get('/dummy',dummyLike);
router.post('/post/create', createPost);
router.get('/posts', getAllPost);
router.post('/post/like', likePost);
router.post('/post/unlike', unlikePost);

//export
module.exports = router;