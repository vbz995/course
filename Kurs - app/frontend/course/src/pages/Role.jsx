import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { Row, Col } from 'react-bootstrap';
 const Role = () => {
  return (
    <Row className='d-flex justify-content-center align-items-center min-vh-100'>
        <Col xs={3}>
         <a href="/register/teacher">
             <MDBCard>
                <MDBCardImage src="/pictures/teacher_role.jpg" alt='...' position='top' className='h-50'/>
                <MDBCardBody>
                    <MDBCardText className='text-center'>
                       <b>Profesor</b> 
                     </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </a>
        </Col>
        <Col xs={3}>
         <a href="/register/student">
            <MDBCard>
                <MDBCardImage src='/pictures/student_role.jpg' alt='...' position='top' />
                <MDBCardBody>
                    <MDBCardText className='text-center'>
                       <b>Student</b> 
                     </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </a>
        </Col>
       
       
    </Row>
  )
}
export default Role;