const express =  require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

//defining routes
const blog = require("./routes/blog");

//mount blogs
app.use("/api/v1", blog);

app.listen(PORT, ()=>{
  console.log(`server running on this ${PORT}`);
})

const dbConnect = require('./config/database');
dbConnect();

app.get('/',(req, res)=>{
    res.send(`<h1>This is our HOMEPAGE</h1>`)
})