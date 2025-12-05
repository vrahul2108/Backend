//for authentication - auth   for autherization - isStudent, isAdmin

const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.auth = (req, res, next) =>{
    try{
        const token = req.body.token;

        if(!token){
            res.status(401).json({
                success: false,
                message: 'Toke n Missing'
            })
        }
    }catch(e){

    }
}