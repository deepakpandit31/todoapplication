const express = require("express");

const router = express.Router();
const { createTodos, getallTodos, gettodoByID, updateTodo, updateTodoStatus, deleteTodo } = require("../controller/todoController.js");

// get all todos
router.get('/',getallTodos);
// get todoby Id
router.get('/:id',gettodoByID);
// create todo or add new todo
router.post('/',createTodos);
//update todo by id
router.put('/:id',updateTodo);
//update status
router.patch('/:id/status',updateTodoStatus);
//delete todo
router.delete('/:id',deleteTodo);

module.exports =router;