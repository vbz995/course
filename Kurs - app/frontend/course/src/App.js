
import { Container } from 'react-bootstrap';
import './App.css';
import Homepage from './pages/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllCourses from './pages/AllCourses';
import Course from './pages/Course';
import  Registration  from './pages/Registration';
import Login from './pages/Login'
import Role from './pages/Role';
import RegistrationTeacher from './pages/RegistrationTeacher';
import RegistrationStudent from './pages/RegistrationStudent';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';

function App() {
  
  return (
    <Container fluid className='min-vh-100'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/course" element={<AllCourses />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/course/create" element={<AddCourse />} />
        <Route path="/course/edit/:id" element={<EditCourse />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/register/role" element={<Role />} />
        <Route path="/register/teacher" element={<RegistrationTeacher />} />
        <Route path="/register/student" element={<RegistrationStudent />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </Container>
   
    
  );
}

export default App;
