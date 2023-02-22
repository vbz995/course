import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import NavbarHeader from "../components/Navbar"

const AllCourses = ()=>{
    const fotografija ="/pictures/course_default.png";
    const id = useParams().id;
    const [course, setCourse] = useState({})
    useEffect(()=>{
        axios.get("http://localhost:5000/api/course/"+id)
        .then((res)=>setCourse(res.data[0]))
    },[])
    return (
        <div>
            <Header />
            <NavbarHeader />
             <Row>
              <Col xs={12}>
               <h1 className="text-center">{course.naziv}</h1>
              </Col>
              <Col xs={12} className="h-50">
               <img src={course.fotografija?course.fotografija:fotografija} className='shadow-4 img-fluid' alt='...' /> 
              </Col>
               <Col xs={12} className="d-flex justify-content-between">
                <h3>{course.info}</h3>
              </Col>
                
                <Col xs={12} className="text-justify">
               {course.detaljan_opis}
                </Col>

            </Row>
            <Footer />
        </div>
    )
}

export default AllCourses