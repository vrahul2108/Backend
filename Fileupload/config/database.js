const mongoose = require("mongoose");

require("dotenv").config();

//to feed database url or environment inside the process using dotenv

const connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then ( ()=> {
        console.log('DB Connection Establish');
    })
    .catch((error)=>{
        console.log('DB Connection issue');
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = connect;