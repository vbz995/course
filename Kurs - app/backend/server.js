
const config = require('./config/config')

const port = config.PORT;

const express = require("express");
const app = express();

app.use(express.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

const courseController = require('./controllers/course')
const studentController = require('./controllers/student')
const teacherController = require('./controllers/teacher')
const userController = require('./controllers/user')

app.use('/api/course', courseController)
app.use('/api/student', studentController)
app.use('/api/teacher', teacherController)
app.use('/api/user', userController)


app.listen(port, () => {
    console.log("The server started on port: "+ port)
})