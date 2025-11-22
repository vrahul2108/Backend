//import the model
const Todo = require('../models/Todo');

//define the route handler

exports.createTodo = async(req,res) => {

   try{
        //extract title and decription
        const {title, description} = req.body;
        //creating new Obj and insert in a DB
        const response = await Todo.create({title, description});

        //sending response json
        res.status(200).json(
            {
                success: true,
                data:response,
                message: "Data Create dSuccessfully"
            }
        );
   }

   catch(error){
    console.log(error);
    console.error(error);
    res.status(500).json(
        {
            success: false,
            data : "Internal Server Error",
            message : error.message
        }
    )
    
   }

} 
