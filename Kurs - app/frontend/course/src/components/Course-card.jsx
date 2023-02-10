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
const fotografija = props.course.fotografija? props.course.fotografija :"https://scontent-mxp2-1.xx.fbcdn.net/v/t1.6435-9/120192815_3664448090254785_1112644891471240032_n.png?stp=dst-png_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=QMzAkJovMDIAX855IeO&_nc_ht=scontent-mxp2-1.xx&oh=00_AfCBG6kWvn4rH5P6Rw7ImGxZXb6PoI4fboKHJSzINITpzA&oe=6403563A";
    return (
    
            <Col  xs={3} className="my-2">
                <MDBCard>
                    <MDBCardBody>
                    <MDBCardImage src={fotografija} position='top'/>
                      <MDBCardTitle>{props.course.naziv}</MDBCardTitle>
                     <MDBCardText>
                       {props.course.info}
                      </MDBCardText>
                      <MDBBtn href={"/course/"+props.course.id}>Saznaj više</MDBBtn>
                   </MDBCardBody>
                </MDBCard>
            </Col>
        
    )
}

export default CourseCard