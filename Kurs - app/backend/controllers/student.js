const express = require('express')
const app =  express();

const studentModel= require("../models/student.js");

app.get("/",studentModel.getAllStudents);
app.get("/:id", studentModel.getStudent);
app.post("/", studentModel.addStudent);
app.put("/:id", studentModel.updateStudent);
app.delete("/:id", studentModel.deleteStudent);

module.exports=app;