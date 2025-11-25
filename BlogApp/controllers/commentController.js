//import models
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

//writing bus. logic

exports.createComment = async (req, res) =>{
    try{
        //obj destructuring
        const {post, user, body} = req.body;

        //creating obj
        const comment = new Comment({
            post, user, body
        });

        //saving new comment on the db
        const saveComment = await comment.save();

        //update the comment array
        const updatedPost = await Post.findByIdAndDelete(post, 
            {$push : {comments: saveComment._id}}, {new : true})
            .populate("comments")
            .exec();

        res.status(200).json({
            data: updatedPost,
        })    

    }
    catch(e){
        res.status(500).json({
            e : 'Error while creating comment'
        })
    }
}

//exporting
