const express = require('express');
const router = express.Router();
const TodoConttroler = require('../controllers/todo.controller');
const userControler = require('../controllers/user.controller')
const auth = require('../middleware/auth')

// todo routes
router.post(`/add_todo`,auth,TodoConttroler.AddTodo)
router.get("/usertodos/:id",auth,TodoConttroler.TodoList)
router.post(`/delete/tode`,TodoConttroler.DeleteTodo)
router.post(`/edit/todo`,TodoConttroler.EditTodo)


// user routes
router.post('/login', userControler.Login);
router.post(`/signup`,userControler.Signup)


module.exports = router;