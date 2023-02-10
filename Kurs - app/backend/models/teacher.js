const pool = require("../databaseConnection")

const getAllTeachers = (request, response)=>{
    pool.query('SELECT * FROM "Predavac"', (err, res)=>{
      
        if(err){
       throw err;
        }
      response.status(200).json(res.rows)
    })
}

const getTeacher = (request, response)=>{
    const id = request.params.id;
    pool.query('SELECT * FROM "Predavac" WHERE id = $1', [id], (err, res)=>{
        if(err){
          throw err;
        }
        response.status(200).json(res.rows);
        
    })
}

const addTeacher = (request, response) => {
   const {ime,prezime,email,adresa,biografija} = request.body;
    pool.query('INSERT INTO "Predavac" (ime, prezime, email, adresa, biografija) VALUES ($1, $2, $3, $4, $5)',[ime,prezime, email,adresa,biografija],(err,res)=>{
        if(err){
            throw err;
        }
        response.status(201).send("Uspjesno dodat rekord");
    });
}

const updateTeacher = (request, response) => {
    const id = request.params.id;
    const {ime,prezime,email,adresa,biografija} = request.body;
    pool.query('UPDATE "Predavac" SET ime = $1, prezime = $2, email = $3, adresa = $4, biografija = $5 WHERE id = $6', [ime,prezime,email,adresa,biografija,id], (err,res)=>{
        if(err){
            throw err;
        }
        response.status(201).send("Uspjesno izmijenjen rekord");
    })
}
const deleteTeacher = (request, response)=>{
    const id = request.params.id;
    pool.query('DELETE FROM "Predavac" WHERE id = $1', [id], (err, res)=>{
        if(err){
          throw err;
        }
        response.status(201).send("Uspjesno obrisan rekord");
        
    })
}

module.exports={
   getAllTeachers,
   getTeacher,
   addTeacher,
   updateTeacher,
   deleteTeacher
}