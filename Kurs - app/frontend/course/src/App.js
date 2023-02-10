
import { Container } from 'react-bootstrap';
import './App.css';
import Homepage from './pages/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllCourses from './pages/AllCourses';
import Course from './pages/Course';
import  Registration  from './pages/Registration';


function App() {
  
  return (
    <Container fluid className='min-vh-100'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/course" element={<AllCourses />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
    </Container>
   
    
  );
}

export default App;
