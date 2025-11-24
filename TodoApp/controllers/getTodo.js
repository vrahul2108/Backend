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

exports.getTodoById = async(req, res)=>{

    try{
        const {id} = req.params; //or const id = req.params.id
        const todo = await Todo.findById({_id : id});
        if(!todo){
            return res.status(400).json(
                {
                    success : false,
                    message: 'Todo Not found'
                })
        }

        res.status(200).json({
            success :true,
            data: todo,
            message : 'Todo Item Found'
        })
    }
    catch(e){
         console.error(e);
      res.status(500).json(
       {
        success:false,
        error : error.message,
        message: 'Server Error'
       })
    }
}
