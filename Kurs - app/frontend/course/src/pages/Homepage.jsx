import axios from "axios"
import { MDBBtn } from "mdb-react-ui-kit"
import { useEffect } from "react"
import { useState } from "react"
import { Row, Col } from "react-bootstrap"
import CarouselPage from "../components/Carousel"
import CourseCard from "../components/Course-card"
import Footer from "../components/Footer"
import Header from "../components/Header"
import NavbarHeader from "../components/Navbar"
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

 const defaultProps = {
    center: {
      lat:43.818663392,
      lng:18.355498578
    },
    zoom: 11
  };


const Homepage = () => {
    const [courses, setCourses] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000/api/course")
        .then((res)=>setCourses(res.data))
    }, [])
    return(
        <div>
            <Header />
            <NavbarHeader />
            <CarouselPage/>
            <Row>
            {courses.slice(0,4).map((c)=>{
            return (
                <CourseCard course={c} />
            );
            })
            }
            <Col xs={12} className="text-center">
                 <MDBBtn className="bg-blue my-3" href='/course'>Pogledaj sve kurseve</MDBBtn>
            </Col>
            <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB8UyiQIJ6pj_WKktRiZzQnGFjE8-HYIkQ" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={43.818663392 }
          lng={18.355498578}
          text="Lingua"
        />
      </GoogleMapReact>
    </div>
            </Row>
           
            <Footer />
        </div>
    )
 

}

export default Homepage