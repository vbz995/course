import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import Header from '../components/Header';
import NavbarHeader from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


 const RegistrationTeacher = () => {
  const navigate = useNavigate();
    const [teacher, setTeacher] = useState({
       name: "",
        lastName: "",
        address: "",
        bio: "",
        userId: localStorage.getItem("userId")

})
const getNameValue = (e) => {

       teacher.name =  e.target.value;
    
}
const getLastNameValue = (e) => {

       teacher.lastName =  e.target.value;
    
}
const getAddressValue = (e) => {

       teacher.address =  e.target.value;
    
}
const getBioValue = (e) => {

       teacher.bio =  e.target.value;
    
}
const checkUser = () => {
           axios.post("http://localhost:5000/api/teacher/", teacher)
           .then(res => {
            if(res.status == 201){
                navigate("/login")
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
          <h2 className="text-uppercase text-center mb-5">Vasi podaci: </h2>
          <MDBInput wrapperClass='mb-4' label='Ime' size='lg' id='name' type='text' name='name' onChange={getNameValue}/>
           <MDBInput wrapperClass='mb-4'label='Prezime' size='lg' id='lastName' type='text' name='lastName' onChange={getLastNameValue}/>
          <MDBInput wrapperClass='mb-4' label='Adresa' size='lg' id='address' type='text' name='address' onChange={getAddressValue}/>
          <textarea wrapperClass='mb-4' label='Biografija' size='lg' id='bio' name='bio' onChange={getBioValue} cols="30" rows="10"></textarea>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={checkUser}>Registruj se</MDBBtn>
        </MDBCardBody>
      </MDBCard>      
    </MDBContainer>
    <Footer />
    </div>
   
  )
}
export default RegistrationTeacher