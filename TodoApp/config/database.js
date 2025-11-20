///Established connection bw app and DB

const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then ( ()=> {
        console.log('connection Establish');
    })
    .catch((error)=>{
        console.log('DB Connection issue');
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;