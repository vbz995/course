import React from 'react'
import { MDBInput, MDBTextArea, MDBBtn } from 'mdb-react-ui-kit';

const Contact = () => {
  return (
    <div className='d-flex text-center'>
         <form id='form' className='text-center' style={{ width: '100%', maxWidth: '300px' }}>
      <h2>Kontaktirajte nas: </h2>

      <MDBInput label='Ime' v-model='name' wrapperClass='mb-4' />

      <MDBInput type='Email' label='Email address' v-model='email' wrapperClass='mb-4' />

      <MDBInput label='Predmet' v-model='subject' wrapperClass='mb-4' />

      <MDBTextArea wrapperClass='mb-4' label='Poruka' />


      <MDBBtn color='primary' block className='my-4'>
        Posalji
      </MDBBtn>
    </form>
    </div>
  )
}
export default Contact