import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import NavbarHeader from "../components/Navbar"

const AllCourses = ()=>{
    const fotografija ="https://scontent-mxp2-1.xx.fbcdn.net/v/t1.6435-9/120192815_3664448090254785_1112644891471240032_n.png?stp=dst-png_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=QMzAkJovMDIAX855IeO&_nc_ht=scontent-mxp2-1.xx&oh=00_AfCBG6kWvn4rH5P6Rw7ImGxZXb6PoI4fboKHJSzINITpzA&oe=6403563A";
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
              <Col>
               <h1 className="text-center">{course.naziv}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
               <img src={course.fotografija?course.fotografija:fotografija} className=' shadow-4  w-100' alt='...' />
              </Col>
            </Row>
            <Row>
                <h3>{course.info}</h3>
            </Row>
            <Row>
                <Col className="text-justify">
               {course.detaljan_opis}
                </Col>

            </Row>
            <Footer />
        </div>
    )
}

export default AllCourses