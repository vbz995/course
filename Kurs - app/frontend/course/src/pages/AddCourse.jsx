import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
}
from 'mdb-react-ui-kit';
import Header from '../components/Header';
import NavbarHeader from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


 const AddCourse = () => {
  const navigate = useNavigate();
  const [teachers, setTeacher] = useState([]);
  useEffect(()=>{
        axios.get("http://localhost:5000/api/teacher/")
        .then(res => setTeacher(res.data))
  },[])

    const [course, setCourse] = useState({
       name: "",
        level: "",
        dateFrom: null,
        dateTo: null,
        info: "",
        description: "",
        image: null,
        teacherId:null

})
const getNameValue = (e) => {

       course.name =  e.target.value;
    
}
const getLevelValue = (e) => {

       course.level =  e.target.value;
    
}
const getDateFrom = (e) => {

       course.dateFrom =  e.target.value;
    
}
const getDateTo = (e) => {

       course.dateTo =  e.target.value;
    
}
const getDescription = (e) => {

       course.description =  e.target.value;
    
}
const getInfo = (e) => {

       course.info =  e.target.value;
    
}

const getTeacher =(e)=>{
    course.teacherId = e.target.value
}
const getImagePath = (e) => {
    var file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      course.image=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
    console.log(course.image)
}

const createCourse = () => {
           axios.post("http://localhost:5000/api/course/", course)
           .then(res => {
            if(res.status == 201){
                 navigate("/");  
              }
           })

          
}
  return (
    <div>
    <Header />
    <NavbarHeader />
   <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
            <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Unesite podatke o kursu: </h2>
          <img src={course.image} alt="" />
        <MDBInput wrapperClass='mb-4' label="Slika" size='lg' id='image' type='file' accept='image/*' name='image' onChange={getImagePath} />
          <MDBInput wrapperClass='mb-4' label='Naziv' size='lg' id='name' type='text' name='name' onChange={getNameValue}/>
            <MDBInput wrapperClass='mb-4'label='Nivo' size='lg' id='level' type='text' name='level' onChange={getLevelValue}/>
          <MDBInput wrapperClass='mb-4' label='Datum početka' size='lg' id='dateFrom' type='date' name='dateFrom' onChange={getDateFrom}/>
            <MDBInput wrapperClass='mb-4' label='Datum završetka' size='lg' id='dateTo' type='date' name='dateTo' onChange={getDateTo}/> 
            <MDBInput wrapperClass='mb-4'label='Info' size='lg' id='info' type='text' name='info' onChange={getInfo}/>
           <MDBTextArea  wrapperClass='mb-4' id='textAreaExample' label='Opis' rows={10} onChange={getDescription}></MDBTextArea>
           <label htmlFor="teacher">Profesor:</label>
           <select id="teacher" className='mb-4 w-100' onChange={getTeacher}>
            <option value={0}></option>
                {
                    teachers.map(teacher=>{
                        return <option value={teacher.id}>{teacher.ime+" " + teacher.prezime}</option>
                    })
                }
                
            </select>
             <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={createCourse}>Kreiraj kurs</MDBBtn>
        </MDBCardBody>
      </MDBCard>      
    </MDBContainer>
    <Footer />
    </div>
   
  )
}
export default AddCourse