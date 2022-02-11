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
                  ORDER BY id ASC
                  LIMIT 9`
      ,(error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

const updateCourse = (id, start, end) =>{
  return new Promise(function(resolve, reject) {
    pool.query(`UPDATE instructors SET created_at = (to_timestamp(${start} / 1000.0)), updated_at = (to_timestamp(${end} / 1000.0)) WHERE id = ${id}`,
    (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  }) 
}

module.exports = {
    getInstructors,
    updateCourse
}