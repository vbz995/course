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
import { useNavigate, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';


 const EditCourse = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true)
  const [teachers, setTeacher] = useState([]);
  const [course, setCourse] = useState({})
  
  useEffect(()=>{
        axios.get("http://localhost:5000/api/course/"+params.id)
        .then(res => {
            setCourse(res.data[0]);
            setLoading(false)})
        axios.get("http://localhost:5000/api/teacher/")
          .then(res => {
            setTeacher(res.data);})
        
  },[])
const getNameValue = (e) => {
       course.naziv =  e.target.value;
    
}
const getLevelValue = (e) => {

       course.nivo =  e.target.value;
    
}
const getDateFrom = (e) => {

       course.trajanje_od =  e.target.value;
    
}
const getDateTo = (e) => {

       course.trajanje_do =  e.target.value;
    
}
const getDescription = (e) => {

       course.detaljan_opis =  e.target.value;
    
}
const getInfo = (e) => {

       course.info =  e.target.value;
    
}

const getTeacher =(e)=>{
    course.id_predavaca = e.target.value
}
const getImagePath = (e) => {
    var file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      course.fotografija=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
}

const updateCourse = () => {
    console.log(course)
           axios.put("http://localhost:5000/api/course/"+params.id, course)
           .then(res => {
            console.log(res)
            if(res.status == 201){
                navigate("/");
              }
           })

          
}
if(loading){
    return <div>Loading.....</div>
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
        <MDBInput wrapperClass='mb-4' label="Slika" size='lg' id='image' type='file' accept='image/*' name='image' onChange={getImagePath}/>
          <MDBInput wrapperClass='mb-4' label='Naziv' size='lg' id='name' type='text' name='name' onChange={getNameValue} defaultValue={course.naziv}/>
            <MDBInput wrapperClass='mb-4'label='Nivo' size='lg' id='level' type='text' name='level' onChange={getLevelValue} defaultValue={course.nivo}/>
          <MDBInput wrapperClass='mb-4' label='Datum početka' size='lg' id='dateFrom' type='date' name='dateFrom' onChange={getDateFrom} defaultValue={format(new Date(course.trajanje_od), "yyyy-MM-dd")}/>
            <MDBInput wrapperClass='mb-4' label='Datum završetka' size='lg' id='dateTo' type='date' name='dateTo' onChange={getDateTo} defaultValue={format(new Date(course.trajanje_do), "yyyy-MM-dd")}/> 
            <MDBInput wrapperClass='mb-4'label='Info' size='lg' id='info' type='text' name='info' onChange={getInfo} defaultValue={course.info}/>
           <MDBTextArea  wrapperClass='mb-4' id='textAreaExample' label='Opis' rows={10} onChange={getDescription} defaultValue={course.detaljan_opis}></MDBTextArea>
           <label htmlFor="teacher">Profesor:</label>
           <select id="teacher" className='mb-4 w-100' onChange={getTeacher} defaultValue={course.id_predavaca?course.id_predavaca:0}>
                <option value={0}>{"Izaberite profesora"}</option>
                {
                    teachers.map(teacher=>{
                        return <option value={teacher.id}>{teacher.ime+" " + teacher.prezime}</option>
                    })
                }
                
            </select>
             <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={updateCourse}>Azuriraj kurs</MDBBtn>
        </MDBCardBody>
      </MDBCard>      
    </MDBContainer>
    <Footer />
    </div>
   
  )
}
export default EditCourse