const Todo = require('../models/Todo');


exports.getTodo = async(req, res) =>{

  try{
      const todos = await Todo.find({});

      res.status(200).json(
        {
            success: true,
            data: todos,
            message: 'Entire todo data fetched'
        }
      )
  }
  catch(error){
    console.error(error);
    res.status(500).json({
        success: false,
        error: error.message,
        message: 'Server Error'
    });
  }

}
