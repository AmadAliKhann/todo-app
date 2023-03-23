import express from 'express';
import { addUser, deleteUser, getUser, getUserById, login, updateUser } from '../controllers/user.controller.js';

export const userRouter = express.Router();



userRouter.route('/')
.get(getUser)
    .post(addUser);
    
    userRouter.route('/:uid')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

userRouter.route('/login')
    .post(login);