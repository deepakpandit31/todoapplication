const todo = require("../models/todoModel.js");
const createTodo = async (todoData) => {
    const newTodo = await todo.create(todoData);
    return newTodo;
};

const getAllTodos = async (search) => {

    if (search) {
        const gettodo = await todo.find({
            title: { $regex: search, $options: "i" }
        });

        return gettodo;
    }

    const gettodo = await todo.find();

    return gettodo;
}

    const getTodoById = async (id) => {
        const gettodobyid = await todo.findById(id);
        return gettodobyid;
    }
    const updateById = async (id, todoData) => {
        const updatetodo = await todo.findByIdAndUpdate(
            id,
            todoData,
            { new: true }
        );
        return updatetodo;
    }
    const updatetodostatusbyId = async (id, status) => {
        const updatestatus = await todo.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        return updatestatus;
    }
    const deleteTodobyId = async (id) => {
        const deleteTodo = await todo.findByIdAndDelete(id);
        return deleteTodo;
    }
    module.exports = {
        createTodo,
        getAllTodos,
        getTodoById,
        updateById,
        updatetodostatusbyId,
        deleteTodobyId
    };