import axios from 'axios';
import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import Files from 'react-files'
import { useNavigate } from 'react-router-dom';
const fileTypes = ["PDF", "DOCX", "DOC"];


 const Material = () => {
  const navigate = useNavigate();
  const [uploadedFile, setFile] = useState({
    material:null,
    name:null
  });
  const handleChange = (file) => {
    uploadedFile.name=file.name;
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader)
      uploadedFile.material=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
    axios.post("http://localhost:5000/api/course/5", uploadedFile)
    .then((res)=> {
      if(res.status == 201){
        navigate("/course/material")
      }
    })
  };
  return (
    <>
    <Files
        className='files-dropzone'
        onChange={handleChange}
        maxFileSize={10000000}
        minFileSize={0}
        clickable>
        Drop files here or click to upload
      </Files>
        <a href={uploadedFile.material} download={uploadedFile.name}>{`${uploadedFile.material}`}</a>
     <FileUploader handleChange={handleChange} name="file" types={fileTypes} label="Kliknite ili prevucite da bi ste fajl ucitali" />
    </>
     
  )
}
export default Material