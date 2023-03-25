const pool = require("../databaseConnection")


const getAllStudents = (request, response)=>{
    pool.query('SELECT * FROM "Polaznik"', (err, res)=>{
      
        if(err){
       throw err;
        }
      response.status(200).json(res.rows)
    })
}

const getStudent = (request, response)=>{
    const id = request.params.id;
    pool.query('SELECT * FROM "Polaznik" WHERE id = $1', [id], (err, res)=>{
        if(err){
          throw err;
        }
        response.status(200).json(res.rows);
        
    })
}

const addStudent = (request, response) => {
    const {name, lastName, birthDate, address, userId} = request.body;
    pool.query('INSERT INTO "Polaznik" (ime, prezime, datum_rodjenja, adresa, id_korisnika) VALUES ($1, $2, $3, $4, $5)',[name,lastName,birthDate,address,userId],(err,res)=>{
        if(err){
            throw err;
        }
        response.status(201).send("Uspjesno dodat rekord");
    });
}

const updateStudent = (request, response) => {
    const id = request.params.id;
    const {ime, prezime, email, datum_rodjenja, jmgb, adresa} = request.body;
    pool.query('UPDATE "Polaznik" SET ime = $1, prezime = $2, email = $3, datum_rodjenja=$4, jmbg = $5, adresa = $6 WHERE id = $7', [ime,prezime,email,datum_rodjenja,jmgb,adresa,id], (err,res)=>{
        if(err){
            throw err;
        }
        response.status(201).send("Uspjesno izmijenjen rekord");
    })
}
const deleteStudent = (request, response)=>{
    const id = request.params.id;
    pool.query('DELETE FROM "Polaznik" WHERE id = $1', [id], (err, res)=>{
        if(err){
          throw err;
        }
        response.status(201).send("Uspjesno obrisan rekord");
        
    })
}
module.exports={
    getAllStudents,
    getStudent, 
    addStudent,
    updateStudent,
    deleteStudent
}