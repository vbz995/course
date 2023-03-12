
const express = require('express')
const app =  express();

const courseModel= require("../models/course.js");

app.get("/",courseModel.getAllCourses);
app.get("/:id", courseModel.getCourse);
app.post("/", courseModel.addCourse);
app.put("/:id", courseModel.updateCourse);
app.delete("/:id", courseModel.deleteCourse);
app.post("/:id", courseModel.addMaterial);
app.get("/:id/material", courseModel.getCourseMaterial);
app.post("/:id/student", courseModel.addStudentToCourse);
app.get("/:id/students", courseModel.getCourseStudents);
module.exports=app;