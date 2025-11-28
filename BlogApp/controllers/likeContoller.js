const Post = require('../models/postModel');
const Like = require('../models/likeModel');

exports.likePost = async(req, res)=>{
    try{
        const {post, user} = req.body;

        const like = new Like({
            post, user,
        })

        const saveLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{likes : saveLike._id}}, {new: true})
                            .populate("likes")
                            .exec();

        res.status(200).json({
            data:updatedPost,
        })
    }
    catch(e){
         res.status(400).json({
            success:false,
            e: e.message,
            message: 'Internel error'
        })
    }
}


exports.unlikePost = async(req, res) =>{
    try{
        const {post, like} = req.body;

        const removeLike = await Like.findOneAndDelete({post: post, _id: like});

        const updatedPost = await Post.findByIdAndUpdate(post, {$pull:{likes:removeLike._id}}, {new: true});

        res.json({
            data: updatedPost,
        })
    }
    catch(e){
        return res.json({
            e: "Not removed"
        })
    }
}

exports.dummyLike=(req,res)=>{
    res.send(`<h1>dummy data</h1>`)
}