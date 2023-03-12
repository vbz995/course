import NavbarHeader from "../components/Navbar";
import { MDBContainer,  MDBBtn, MDBInput, MDBCheckbox, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import Footer from "../components/Footer";
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
const Login = () => {
    const navigate = useNavigate();
    const [logged, setLogged] = useState(false)
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
             axios.get("http://localhost:5000/api/user/")
             .then( (response) => setUsers(response.data)
             )      
    

    },[])
    const getUsername = (e) =>{
        setUsername(e.target.value);
    }
    const getPassword = (e) =>{
        setPassword(e.target.value);
    }
    const checkUser = () => {
     users.map(user=>{
        if(user.korisnicko_ime == username && user.lozinka == password){
            localStorage.setItem("user", JSON.stringify(user))
            setLogged (true)
            navigate("/")
           
            }
     })

     if(!logged){
        NotificationManager.error('Pogresni podaci. Pokusaj ponovo', 'Greskaaaa', 5000);
     }
    }
    return (
     
            <div >
            <NavbarHeader />
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image min-vh-100' style={{backgroundImage: 'url(/pictures/course_background.jpg)'}}>
                        <div className='mask gradient-custom-3'></div>
                        <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                            <MDBCardBody className='px-5'>
                            <h2 className="text-uppercase text-center mb-5">Prijavi se</h2>
                            <MDBInput wrapperClass='mb-4' label='Korisničko ime' size='lg' id='username' type='text' name='username' onChange={getUsername}/>
                            <MDBInput wrapperClass='mb-4' label='Lozinka' size='lg' id='password' type='password' name='password' onChange={getPassword}/>
                            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={checkUser}>Prijavi se</MDBBtn>
                            <h5 className="text-center">Nemaš nalog? <a href="/register">Registruj se</a></h5>
                            </MDBCardBody>
                         </MDBCard>      
            </MDBContainer>
          
            <Footer />
              <NotificationContainer />
            </div>
            
        
    )
}


export default Login;