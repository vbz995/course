import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Header from '../components/Header';
import NavbarHeader from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';

 const Registration = () => {
  const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
        terms:false

})
const getEmailValue = (e) => {

       user.email =  e.target.value;
    
}
const getUsernameValue = (e) => {

       user.username =  e.target.value;
    
}
const getPasswordValue = (e) => {

       user.password =  e.target.value;
    
}
const getRepeatPassword = (e) => {

       user.repeatPassword =  e.target.value;
    
}
const checkTerms = (e) => {

     if(user.terms){
      user.terms=false;
     }
     else{
      user.terms=true;
     }
    
}
const checkUser = () => {
    if(user.password == user.repeatPassword && user.username != "" && user.email!="" && user.password !="" && user.terms){
           axios.post("http://localhost:5000/api/user/", user)
           .then(res => {
            console.log(navigate)
            if(res.status == 201){
                navigate("/")
              }
           })
    }
    else{
      NotificationManager.error('Popunite sva polja.', 'Greskaaaa', 5000);

    }
}
  return (
    <div>
    <Header />
    <NavbarHeader />
   <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(/pictures/course_background.jpg)'}}>
            <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Kreirajte nalog</h2>
          <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='email' type='email' name='email' onChange={getEmailValue}/>
           <MDBInput wrapperClass='mb-4' label='Korisničko ime' size='lg' id='username' type='text' name='username' onChange={getUsernameValue}/>
          <MDBInput wrapperClass='mb-4' label='Lozinka' size='lg' id='password' type='password' name='password' onChange={getPasswordValue}/>
          <MDBInput wrapperClass='mb-4' label='Ponovljena lozinka' size='lg' id='repeatPassword' type='password' name='repeatPassword' onChange={getRepeatPassword}/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='terms' label='Slažem se sa uslovima korišćenja' onChange={checkTerms}/>
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={checkUser}>Registruj se</MDBBtn>
        </MDBCardBody>
      </MDBCard>      
    </MDBContainer>
    <Footer />
    <NotificationContainer />
    </div>
   
  )
}
export default Registration