import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';

const CarouselPage = () => {
  const fotografija = "https://scontent-mxp2-1.xx.fbcdn.net/v/t1.6435-9/120192815_3664448090254785_1112644891471240032_n.png?stp=dst-png_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=QMzAkJovMDIAX855IeO&_nc_ht=scontent-mxp2-1.xx&oh=00_AfCBG6kWvn4rH5P6Rw7ImGxZXb6PoI4fboKHJSzINITpzA&oe=6403563A"
    const [courses, setCourses] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000/api/course")
        .then((res)=>setCourses(res.data))
    }, [])
  return (
  <Carousel nextIcon =">" prevIcon="<" slide interval={2000}>
        {courses.slice(0,6).map(c=>{
            return(
            <Carousel.Item >
              <a href={"/course/"+c.id}>
                <img className="d-block w-100" src={c.fotografija?c.fotografija:fotografija} alt={c.naziv}/>
                <Carousel.Caption>
                  <h3>{c.naziv}</h3>
                  <p>{c.info}</p>
                </Carousel.Caption>
              </a>
        
      </Carousel.Item>
            )
        })}

    </Carousel>
  );
}

export default CarouselPage;