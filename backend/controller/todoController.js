const { createTodo, getAllTodos, getTodoById, updateById,updatetodostatusbyId,deleteTodobyId } = require("../services/todoService.js");


const createTodos = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({
                message: "Please enter title it required"
            });

        }
        const newtodo = await createTodo(req.body);
        return res.status(201).json({
            message: "Todo have been added sucessfully",
            todo: newtodo
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "some error hae occured please try again or refresh the page",
            error: error.message
        });

    };

}

const getallTodos = async (req, res) => {
  

    try {
        const search = req.query.search;
        const todos = await getAllTodos(search);
        if (todos.length === 0) {
            return res.status(404).json({
                message: "no todo is present"
            });
        }
        return res.status(200).json({
            message: "your todo list is here",
            todos: todos
        })
    } catch (error) {
        return res.status(500).json({
            message: `some error have occured please try again`,
            error: error.message
        });

    };

}

const gettodoByID = async (req, res) => {
    try {
        const id = req.params.id;

        const todobyid = await getTodoById(id);
        if (todobyid === null) {
            return res.status(404).json({
                message: `it empty write something atleast title `
            })
        }
        return res.status(200).json({
            message: `your requested todo`,
            todobyid: todobyid
        })
    } catch (error) {
        return res.status(500).json({
            message: `some error occured`,
            error: error.message
        })

    }

}

const updateTodo = async (req, res) => {
    try {

        const id = req.params.id;
        const todoData = req.body;
        const updatedTodo = await updateById(id, todoData);
           
        if (updatedTodo === null) {
            return res.status(404).json({
                message: `Nothing present to update`
            });
        }
        
        return res.status(200).json({
            message: "Todo is updated successfully",
            todo: updatedTodo
        });
    } catch (error) {
        return res.status(500).json({
            message: `some error occured`,
            error: error.message
        })

    }
}

const updateTodoStatus =async(req,res)=>{
    try{
        const id = req.params.id;
     const status = req.body.status;
      if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }
        const updatedStatus = await updatetodostatusbyId(id, status);

        if(updatedStatus === null){
            return res.status(404).json({
                message: `Nothing present to update`
            });
        }
         return res.status(200).json({
            message: "Todo is updated successfully",
            todo: updatedStatus
        });

    }catch (error) {
        return res.status(500).json({
            message: `some error occured`,
            error: error.message
        })

    }

}


const deleteTodo = async (req,res)=>{
     
     try{
        const id = req.params.id;
        const deleteTodo = await deleteTodobyId(id);
        if(deleteTodo === null){
            return res.status(404).json({
                message:`no Todo present to delete`
            });
        }
         res.status(200).json({
                message:`deleted sucessfully`
            });


     }catch (error) {
        return res.status(500).json({
            message: `some error occured`,
            error: error.message
        })

    }
}

module.exports = {
    createTodos,
    getallTodos,
    gettodoByID,
    updateTodo,
   updateTodoStatus,
   deleteTodo

}