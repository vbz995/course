import { Col } from "react-bootstrap"
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';
const CourseCard = (props)=>{
const fotografija = props.course.fotografija? props.course.fotografija :"/pictures/course_default.png";
    return (
    
            <Col  xs={3} className="my-2 ">
                <MDBCard>
                    <MDBCardBody>
                    <MDBCardImage  className="cardImage" src={fotografija} position='top'/>
                      <MDBCardTitle className="text-center">{props.course.naziv}</MDBCardTitle>
                     <MDBCardText>
                       {props.course.info}
                      </MDBCardText>
                      <MDBBtn className="w-100 mx-auto bg-blue" href={"/course/"+props.course.id}>Saznaj više</MDBBtn>
                   </MDBCardBody>
                </MDBCard>
            </Col>
        
    )
}

export default CourseCard