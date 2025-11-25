const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect =() =>{
    mongoose.connect(process.env.DATABASE_URL);
    try{
        console.log('DB Connected');
    }
    catch(e){
        console.log('DB connection Isse');
        console.error(e);
        process.exit(1);
    }
}

module.exports = dbConnect;
