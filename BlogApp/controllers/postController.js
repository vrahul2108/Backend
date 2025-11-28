const Post = require('../models/postModel');

exports.createPost = async(req, res)=>{
    try{
        const {title, body} = req.body;

        const post = new Post({
            title, body
        })

        const savePost = await post.save();

        res.status(200).json({
            success: true,
            data: savePost,
            message: "Post Created"
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

exports.getAllPost = async(req, res)=>{
    try{
        const posts = await Post.find().populate("likes").populate("comments").exec();//need to add populate like document

        res.json({
            data : posts,
        })
    }
    catch{
        console.error("Not fetched");
        res.status(400).json({
            error: "Error while fetching Post"
        })
    }
}