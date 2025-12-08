const mongoose = require("mongoose");

require("dotenv").config();

//to feed database url or environment inside the process using dotenv

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then ( ()=> {
        console.log('DB Connection Establish');
    })
    .catch((error)=>{
        console.log('DB Connection issue');
        console.error(error.message);
        process.exit(1);
    })
}