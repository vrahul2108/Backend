//APP CONN
const express = require("express");


const app = express();
//PORT FOND
require('dotenv').config();
const port = process.env.PORT;
//MW ADD
app.use(express.json());
const fileUpload = require("express-fileupload");

app.use(fileUpload()); 
//DB CONN

const connect = require('./config/database');
connect();
//CLOUD CONN
const cloudinary = require('./config/coudinary');
cloudinary.cloudinaryConnect();

//ApI MOUNT
const Upload = require('./routes/FileUpload');

app.use('/api/v1/upload', Upload);

//ACT SERVER

app.listen(port, ()=>{
    console.log(`App is running on the port ${port}`);
    
})