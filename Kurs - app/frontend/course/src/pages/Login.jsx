import { Container } from "react-bootstrap";
import NavbarHeader from "../components/Navbar";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import Footer from "../components/Footer";
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

const Login = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    useEffect(() => {
             axios.get("http://localhost:5000/api/user/")
             .then( (response) => setUsers(response.data)
             )      
    

    },[])
    const getEmail = (e) =>{
        setEmail(e.target.value);
    }
    const getPass = (e) =>{
        setPass(e.target.value);
    }
    const checkUser = () => {
     users.map(user=>{
        if(user.korisnicko_ime === email && user.lozinka === pass){
            localStorage.setItem("user", JSON.stringify(user))
            }
     })
    }
    return (
        <Container>
            
            <NavbarHeader className="container-fluid" />
            <MDBContainer fluid className="p-3 my-5 h-custom">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>
                        <MDBInput  wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" onChange={getEmail} />
                        <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" onChange={getPass} />

                        <div className="d-flex justify-content-between mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div>

                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg' onClick={checkUser}>Login</MDBBtn>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
                        </div>

                    </MDBCol>

                </MDBRow>


            </MDBContainer>
            <Footer />
        </Container>
    )
}


export default Login;