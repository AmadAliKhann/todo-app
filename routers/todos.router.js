import express from 'express';
import { addTodo, deleteTodo, getTodo, getTodoById, updateTodo } from '../controllers/todos.controller.js';


export const todoRouter = express.Router();



todoRouter.route('/')
.get(getTodo);

todoRouter.route('/:uid')
    .post(addTodo);
    
    todoRouter.route('/:tid')
    .get(getTodoById)
    .put(updateTodo)
    .delete(deleteTodo);

