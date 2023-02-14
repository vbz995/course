const pool = require("../databaseConnection")

const getAllUsers = (request, response) => {
    pool.query('SELECT * FROM "Korisnik"', (err, res) => {

        if (err) {
            throw err;
        }
        response.status(200).json(res.rows)
    })
}

const getUser = (request, response) => {
    const id = request.params.id;
    pool.query('SELECT * FROM "Korisnik" WHERE id = $1', [id], (err, res) => {
        if (err) {
            throw err;
        }
        response.status(200).json(res.rows);

    })
}

const addUser = (request, response) => {
    const {username, password, email}=request.body;

    pool.query('INSERT INTO "Korisnik" (korisnicko_ime, lozinka,email) VALUES ($1, $2, $3) RETURNING id', [username, password, email], (err, res) => {
        if (err) {
            throw err;
        }
        console.log(res.rows[0].id)
        response.status(201).send({"id":res.rows[0].id});
    });
}

const updateUser = (request, response) => {
    const id = request.params.id;
    const {korisnicko_ime, lozinka}=request.body;
    pool.query('UPDATE "Korisnik" SET korisnicko_ime = $1, lozinka = $2 WHERE id = $3', [korisnicko_ime, lozinka, id], (err, res) => {
        if (err) {
            throw err;
        }
        response.status(201).send("Uspjesno izmijenjen rekord");
    })

}
const deleteUser = (request, response) => {
    const id = request.params.id;
    pool.query('DELETE FROM "Korisnik" WHERE id = $1', [id], (err, res) => {
        if (err) {
            throw err;
        }
        response.status(201).send("Uspjesno obrisan rekord");

    })
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}