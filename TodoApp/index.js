const express = require('express');
const app = express();

//load config env file
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//mw to parse to req json body
app.use(express.json());

//import routes for TODO API
const todoRoutes = require('./routes/todos');

//mount the todo ASPI routes
app.use('/api/v1', todoRoutes);

//server start
app.listen(PORT, ()=> {
    console.log(`Server running on the port ${PORT}`);
})


//connecting the database
const dbConnect = require('./config/database');
dbConnect();

//default route

app.get('/', (req, res)=>{
  res.send(`<h1>This is OUR HOMEPAGE BABYYY`);
})
