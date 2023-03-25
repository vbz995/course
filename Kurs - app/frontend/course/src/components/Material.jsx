import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";
import Files from 'react-files'
import { FaFile, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const fileTypes = ["PDF", "DOCX", "DOC"];


 const Material = (props) => {
  const navigate = useNavigate();
  const [material, setMaterial] = useState([])
  const [uploadedFile, setFile] = useState({
    material:"",
    name:""
  });
useEffect(()=>{

}, [])
  useEffect(()=>{
    axios.get("http://localhost:5000/api/course/"+props.course.id+"/material")
    .then((res)=>setMaterial(res.data))
  }, [material])

  const handleChange =  (file) => {
    uploadedFile.name=file.name;
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload= ()=>{
      uploadedFile.material=reader.result
       axios.post("http://localhost:5000/api/course/"+props.course.id, uploadedFile)
      .then((res)=> {
      if(res.status == 201){
        console.log(res)
      }
    })
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
   

  };
  return (
    <div className='min-vh-100'>
      <Row>
        <Col xs={12} className="text-center">
          <h3>Materijal</h3>
        </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
             {
                  material.map(mat=>{
                  return <Col className={mat.naziv?" text-center my-2":"d-none"} xs={12}> <a className='w-100 materialItem p-2' href={mat.materijal} download={mat.naziv}><FaFile />{`${mat.naziv}`}</a></Col>
                })
              }
        </Row>
       <Row className='d-flex justify-content-center'>
        <Col xs={6} className="d-flex">
          <FileUploader classes="imageUpload" label="Kliknite da izaberete ili prevucite fajl"  handleChange={handleChange} name="file" types={fileTypes} dropMessageStyle={{display:"none"}}/>
        </Col>
      </Row>
    </div>
    
     
  )
}
export default Material