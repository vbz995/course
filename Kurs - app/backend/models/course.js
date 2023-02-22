

const { response } = require("express");
const { request } = require("../controllers/course");
const pool = require("../databaseConnection")



const getAllCourses = (request, response)=>{
    pool.query('SELECT * FROM "Kurs" ORDER BY id DESC', (err, res)=>{
      
            if(err){
                throw err;
            }
          response.status(200).json(res.rows)
        })
        
}

const getCourse = (request, response)=>{
    const id = request.params.id;
    pool.query('SELECT * FROM "Kurs" WHERE id = $1', [id], (err, res)=>{
        if(err){
          throw err;
        }
        response.status(200).json(res.rows);
    })
    
}

const addCourse = (request, response, next) => {
    
    const {name, level, dateFrom, dateTo, info, description, image} = request.body
   pool.query('INSERT INTO "Kurs" (naziv, nivo, trajanje_od, trajanje_do, info, detaljan_opis, fotografija) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',[name,level,dateFrom,dateTo,info, description, image],(err,res)=>{
        if(err){
            throw err;
        }
        response.status(201).send({"id":res.rows[0].id});
    });
   
}

const updateCourse = (request, response) => {
    const id = request.params.id;
    const {naziv, nivo, datumPocetka, datumZavrsetka, info} = request.body;
    pool.query('UPDATE "Kurs" SET naziv = $1, nivo = $2, trajanje_od = $3, trajanje_do=$4, info = $5 WHERE id = $6', [naziv,nivo, datumPocetka,datumZavrsetka,info,id], (err,res)=>{
        if(err){
            throw err;
        }
        response.status(201).send("Uspjesno izmijenjen rekord");
    })
     
}
const deleteCourse = (request, response)=>{
    const id = request.params.id;
    pool.query('DELETE FROM "Kurs" WHERE id = $1', [id], (err, res)=>{
        if(err){
          throw err;
        }
        response.status(201).send("Uspjesno obrisan rekord");
        
    })
}

const addTeacherToCourse = (request, response)=>{
    const {courseId, teacherId} = request.body;
    pool.query ('INSERT INTO "KursPredavac" (id_predavaca, id_kursa) VALUES ($1,$2)', [teacherId, courseId], (err, res)=>{
        if(err){
          throw err;
        }
        response.status(201).send("Uspjesno dodat rekord");
        
    })
}


module.exports={
    getAllCourses,
    getCourse, 
    addCourse,
    updateCourse,
    deleteCourse,
    addTeacherToCourse
}