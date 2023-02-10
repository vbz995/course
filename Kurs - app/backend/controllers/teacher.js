
const express = require('express')
const app =  express();

const teacherModel= require("../models/teacher.js");

app.get("/",teacherModel.getAllTeachers);
app.get("/:id", teacherModel.getTeacher);
app.post("/", teacherModel.addTeacher);
app.put("/:id", teacherModel.updateTeacher);
app.delete("/:id", teacherModel.deleteTeacher);

module.exports=app;