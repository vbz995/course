

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
    
    const {naziv, nivo, datumPocetka, datumZavrsetka, info} = request.body
   pool.query('INSERT INTO "Kurs" (naziv, nivo, trajanje_od, trajanje_do, info) VALUES ($1, $2, $3, $4, $5)',[naziv,nivo,datumPocetka,datumZavrsetka,info],(err,res)=>{
        if(err){
            throw err;
        }
        response.status(201).send("Uspjesno dodat rekord");
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


module.exports={
    getAllCourses,
    getCourse, 
    addCourse,
    updateCourse,
    deleteCourse
}