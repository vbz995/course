import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import CourseCard from "../components/Course-card";
import Header from "../components/Header";
import NavbarHeader from "../components/Navbar";

const AllCourses = ()=>{
    const [courses, setCourses] = useState([])
    useEffect(() => {
      axios.get("http://localhost:5000/api/course")
        .then((res)=>setCourses(res.data))
    }, [])
    
    return(
        <div>
            <Header />
            <NavbarHeader />
            <Row className="text-center">
                <h1>Dostupni kursevi</h1>
            </Row>
            <Row>
                    {
                        courses.map(c=>{
                            return (
                                <CourseCard course={c}/>
                            )
                        })
                    }

            </Row>

        </div>
    )
}

export default AllCourses;