const {Pool} = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password123",
    database: "sotby-test"
})

pool.connect();

const getInstructors = () => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * from instructors
                  LIMIT 4`
      ,(error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

module.exports = {
    getInstructors,
}