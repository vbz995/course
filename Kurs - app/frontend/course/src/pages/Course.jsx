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
    const isAdmin = user && user.isAdmin? true: false
    const id = useParams().id;
    const [course, setCourse] = useState({})
    const [students, setStudents] = useState([])
    const [deleteModal, setDeleteModal] = useState()
    const [subscribeModal, setSubscribeModal] = useState()
    const [student, setStudent]=useState()
    const [courseStudents, setCourseStudents]=useState([])
    const [isSubscribed, setIsSubscribed]=useState(false)
    const [teacher, setTeacher]=useState({})


    const toggleShow = () => setDeleteModal(!deleteModal);
    const toggleShowSubscibe = () => setDeleteModal(!subscribeModal);
    
    useEffect(()=>{
        axios.get("http://localhost:5000/api/student/")
        .then(res=>{
            if(res.status==200){
                res.data.map(s=>{
                    if(user && user.id == s.id_korisnika){
                        setStudent(s)
                    }
                })
            }
        })
    },[])
    useEffect(()=>{
        axios.get("http://localhost:5000/api/course/"+id)
        .then(res=>{
            if(res.status == 200){
                setCourse(res.data[0])
                axios.get("http://localhost:5000/api/course/"+res.data[0].id+"/students")
                .then(response => {
                    if(response.status==200){
                        setCourseStudents(response.data)
                        response.data.map(s=>{

                           if(student && student.id == s.id_polaznika){
                            console.log(s)
                            setIsSubscribed(true);
                           }
                        })
                    }
                })
            }
        })
    }, [student])

    useEffect(()=>{
        if(course.id_predavaca){
            console.log(course.id_predavaca)
                axios.get("http://localhost:5000/api/teacher/"+course.id_predavaca)
                .then(res=>{
                    if(res.status == 200){
                        console.log(res)
                        setTeacher(res.data[0])
                    }
                })
        }
        
    }, [course])
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
               window.location.reload();
            }
        })
    }   
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
            {isSubscribed || (teacher&&user&&user.id == teacher.id_korisnika)? <Material student={student} course={course} user={user} /> :
             <Row className="mx-5">
               
                <Col xs={12} className={isAdmin?"d-flex":"d-none"}>
              <a href={"/course/edit/"+id}> <MDBBtn>Izmjeni</MDBBtn> </a>
              <MDBBtn onClick={toggleShow}>Obrisi</MDBBtn>
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