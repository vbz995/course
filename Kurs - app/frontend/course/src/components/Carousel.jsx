import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import {} from "react-icons"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


const CarouselPage = () => {
  const fotografija = "https://scontent-mxp2-1.xx.fbcdn.net/v/t1.6435-9/120192815_3664448090254785_1112644891471240032_n.png?stp=dst-png_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=QMzAkJovMDIAX855IeO&_nc_ht=scontent-mxp2-1.xx&oh=00_AfCBG6kWvn4rH5P6Rw7ImGxZXb6PoI4fboKHJSzINITpzA&oe=6403563A"
    const [courses, setCourses] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000/api/course")
        .then((res)=>setCourses(res.data))
    }, [])
  return (
  <Carousel nextIcon ={<FaAngleRight className="colorBlue" />} prevIcon={<FaAngleLeft className="colorBlue" />} slide interval={2000} className="my-4 colorBlue">
        {courses.slice(0,6).map(c=>{
            return(
            <Carousel.Item >
              <a href={"/course/"+c.id}>
                <img className="d-block carouselImage" src={c.fotografija?c.fotografija:fotografija} alt={c.naziv}/>
                <Carousel.Caption>
                  <h3 className="colorBlue">{c.naziv}</h3>
                  <p className="colorBlue">{c.info}</p>
                </Carousel.Caption>
              </a>
        
      </Carousel.Item>
            )
        })}

    </Carousel>
  );
}

export default CarouselPage;