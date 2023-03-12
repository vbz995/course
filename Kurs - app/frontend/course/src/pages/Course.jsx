import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import NavbarHeader from "../components/Navbar"
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import Material from "../components/Material"


const AllCourses = ()=>{
    const fotografija ="/pictures/course_default.png";
    const navigate = useNavigate();
    const user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
    const isAdmin = user.isAdmin? true: false
    const id = useParams().id;
    const [course, setCourse] = useState({})
    const [students, setStudents] = useState([])
    const [deleteModal, setDeleteModal] = useState()
    const [subscribeModal, setSubscribeModal] = useState()
    const [student, setStudent]=useState()
    const [courseStudents, setCourseStudents]=useState([])
    const [isSubscribed, setIsSubscribed]=useState(false)

    useEffect(()=>{
       
        axios.get("http://localhost:5000/api/course/"+id)
        .then((res)=>setCourse(res.data[0]))
    },[])
    useEffect(()=>{
        axios.get("http://localhost:5000/api/student/")
        .then((res)=>setStudents(res.data.map(
                student => {
                    if(student.id_korisnika==user.id){
                   setStudent(student)
            }
        }
        )))
    },[])
    const toggleShow = () => setDeleteModal(!deleteModal);
    const toggleShowSubscibe = () => setDeleteModal(!subscribeModal);
    const deleteCourse = ()=>{
        axios.delete("http://localhost:5000/api/course/"+id)
        .then((res)=>{
            if(res.status==201){
                navigate("/")
            }
        })
    }

    const subscribe = () => {
       axios.post("http://localhost:5000/api/course/"+course.id+"/student", student)
        .then(res=>{
            if(res.status==201){
                navigate("/course/"+course.id)
            }
        })
    }

        useEffect(()=>{
               
                 axios.get("http://localhost:5000/api/course/"+course.id+"/students")
                 .then((res)=>{
                         if(res.status==200){
                                setCourseStudents(res.data)
                                res.data.map(s=>{
                                    if(student.id == s.id_polaznika){
                                        setIsSubscribed(true)
                                    }
                                })
                        }
                 })
                 
        }, [])
        
           
    
    return (

        <div>
            <MDBModal show={deleteModal} setShow={setDeleteModal} tabIndex='-1'>
                <MDBModalDialog>
                     <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Brisanje</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                               <p>Da li zelite da obrisete {course.naziv} kurs?</p> 
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Ne
                            </MDBBtn>
                            <MDBBtn color="danger" onClick={deleteCourse}>Da</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <Header />
            <NavbarHeader />
            {isSubscribed ? <Material /> :
             <Row className="mx-5">
               
                <Col xs={12} className={isAdmin?"d-flex":"d-none"}>
              <a href={"/course/edit/"+id}> <button>Izmjeni</button> </a>
              <button onClick={toggleShow}>Obrisi</button>
              </Col>
               
              <Col xs={12}>
               <h1 className="text-center">{course.naziv}</h1>
              </Col>
              <Col xs={12}>
               <img src={course.fotografija?course.fotografija:fotografija} className='shadow-4 courseImage' alt='...' /> 
              </Col>
               <Col xs={12} className="d-flex justify-content-between">
                <h3>{course.info}</h3>
              </Col>
                
                <Col xs={12} className="text-justify">
               {course.detaljan_opis}
                </Col>
                <Col xs={12} className="text-center">

                     <MDBBtn className={student?'mb-4 w-100 gradient-custom-4':"d-none"} size='lg' onClick={subscribe}>Prijavi se</MDBBtn>
                </Col>
            </Row>
             }
            <Footer />
        </div>
    )
}

export default AllCourses