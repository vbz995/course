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
import { format } from 'date-fns'


 const RegistrationStudent = () => {
  const navigate = useNavigate();
    const [student, setStudent] = useState({
       name: "",
        lastName: "",
        address: "",
        birthDate: null,
        userId: localStorage.getItem("userId")

})
const getNameValue = (e) => {

       student.name =  e.target.value;
    
}
const getLastNameValue = (e) => {

       student.lastName =  e.target.value;
    
}
const getAddressValue = (e) => {

       student.address =  e.target.value;
    
}
const getBirthDateValue = (e) => {

       student.birthDate =  format(new Date(e.target.value), "yyyy-MM-dd") ;   
}
const checkUser = () => {
           axios.post("http://localhost:5000/api/student/", student)
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
          <MDBInput wrapperClass='mb-4' label='Datum rođenja' size='lg' id='birthDate' type='date' name='birthDate' onChange={getBirthDateValue}/>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={checkUser}>Registruj se</MDBBtn>
        </MDBCardBody>
      </MDBCard>      
    </MDBContainer>
    <Footer />
    </div>
   
  )
}
export default RegistrationStudent