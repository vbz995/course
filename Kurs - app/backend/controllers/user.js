const express = require('express')
const app =  express();

const userModel= require("../models/user.js");

app.get("/",userModel.getAllUsers);
app.get("/:id",userModel.getUser);
app.post("/", userModel.addUser);
app.put("/:id", userModel.updateUser);
app.delete("/:id", userModel.deleteUser);

module.exports = app;