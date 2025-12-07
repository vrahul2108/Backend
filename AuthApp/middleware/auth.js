//for authentication - auth   for autherization - isStudent, isAdmin

const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.auth = (req, res, next) =>{
    try{
        console.log(req.cookies.token);
        
        const token =  req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer", "");
        
        if(!token || token ===undefined){
            res.status(401).json({
                success: false,
                message: 'Token Missing'
            })
        }

        try{
            
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;///attaches the authenticated user's data (the payload) to the request object.
        }catch(e){
            return res.status(401).json({
                success: false,
                message: 'Token is invalid/ expired'
            });
        }
        return next();
    }catch(e){
            return res.status(401).json({
                success: false,
                message: 'Something went wrong while verifying the token'
            });
    }
}


exports.isStudent = async(req, res, next)=>{
    try{
        if(req.user.role != "Student"){
            return res.status(401).json({
                success: false,
                message : "Not a part of Student role so unable to proceed"
             })
        }
        return next();
    }catch(e){
        return res.status(500).json({
                success: false,
                message : "User role is not matching",
             })
    }
}

exports.isAdmin = async(req, res, next)=>{
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success: false,
                message : "Not a part of Student role so unable to proceed"
             })
        }
        return next();
    }catch(e){
        return res.status(500).json({
                success: false,
                message : "Admin role is not matching",
             })
    }
}