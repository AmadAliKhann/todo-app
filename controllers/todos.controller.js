// users.controller.js

import { db } from "../server.js";
import createError from "http-errors";

// Get users
export const getTodo = async(req,res,next)=>{
    try{
    const todos = db.data.todos;
    if(!todos.length){
        return next(createError(404, "There are no todos yet"))
    }
   await db.read();
   
    res.status(200).json({message:"registered todos list", registeredTodos: todos})


}catch(err){
    next(err)
}}

//REGISTER
export const addTodo = async (req, res, next) => {
    try {
        const newTodo = {
            ...req.body,
            id: db.data.todos.slice(-1)[0]?.id + 1 || 1,
            authorid: parseInt(req.params.uid)
        };
        //check required fields
        if (!newTodo.title || !newTodo.desc || !newTodo.date) {
            return next(createError(400, "required fields are missed! 🚨"))
            // return res
            //     .status(400)
            //     .json({ message: "required fields are missed! 🚨" });
            // ** creating error manually **
            // const err = newError("required fields are missed! 🚨")
            // err.status = 400;
            // throw err;

        }

        //add newUser to array of users in db
        db.data.todos.push(newTodo);
        await db.write();
        //remove password from newUser for security
        
        res.status(200).json({
            message: "New ToDo successful register! ✅",
            todo: newTodo,
        });
    } catch (err) {
        next(err);
    }
};
/* ---------------------------------------------------------------- */

//PROFILE
export const getTodoById = async (req, res, next) => {
    try{
  const todoid = parseInt(req.params.tid);

  //check if uid is valid
  if (isNaN(todoid)) {
    return next(createError(400, "Todo id in url is not valid. 🚨"))
    //res.status(400).json({ message: "userid in url is not valid. 🚨" });
  }

  //find user with given uid
  const todo = db.data.todos.find((t) => t.id === todoid);
  if (!todo) {
    return next(createError(404, "There is no todo with given todoid. 🚨"))
  //  res
   //   .status(404)
    //  .json({ message: "There is no user with given userid. 🚨" });
  }

  res.status(200).json({ message: "ToDo fetched! ✅", todo: todo });
}catch(err){
    next(err)
}};
/* ---------------------------------------------------------------- */

//UPDATE PROFILE
export const updateTodo = async (req, res, next) => {
    try{
  const todoid = parseInt(req.params.tid);

  //check if uid is valid
  if (isNaN(todoid)) {
    return next(createError(400, "ToDoid in url is not valid. 🚨"))
   // res.status(400).json({ message: "userid in url is not valid. 🚨" });
  }

  //find user with given uid
  const todoIndex = db.data.todos.findIndex((t) => t.id === todoid);
  if (todoIndex === -1) {
    return next(createError(404,"There is no user with given userid. 🚨"))
   // res
   //   .status(404)
   //   .json({ message: "There is no user with given userid. 🚨" });
  }

  //update user
  db.data.todos[todoIndex] = { ...db.data.todos[todoIndex], ...req.body };
  await db.write();
  res
    .status(200)
    .json({ message: "Todo successful update! ✅", todo: db.data.todos[todoIndex] });
}catch(err){
    next(err)
}};
/* ---------------------------------------------------------------- */

//DELETE PROFILE
export const deleteTodo = async (req, res, next) => {
    try{
  const todoid = parseInt(req.params.tid);
  //check if uid is valid
  if (isNaN(todoid)) {
    return next(createError(400,"todoid in url is not valid. 🚨"));
   // res.status(400).json({ message: "userid in url is not valid. 🚨" });
  }

  //find user with given uid
  const todoIndex = db.data.todos.findIndex((t) => t.id === todoid);
  if (todoIndex === -1) {
    return next(createError(404,"There is no todo with given todoid. 🚨" ));
     //res
     // .status(404)
     // .json({ message: "There is no user with given userid. 🚨" });
  }

  //delete user from array users
  db.data.todos.splice(todoIndex, 1);
  await db.write();
  res.status(200).json({ message: "Todo deleted! ✅" });
}catch(err){
    next(err)
}};
/* ---------------------------------------------------------------- */


