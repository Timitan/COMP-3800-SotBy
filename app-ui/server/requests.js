const {Pool} = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password123",
    database: "sotby"
})

pool.connect();

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT u.username, u.first_name, u.last_name, c.start_date, c.end_date, c.title, c.colour from public."public.user" u
                  INNER JOIN public."public.course_assignment" ca ON u.username = ca.username
                  INNER JOIN public."public.course" c ON ca.course_num = c.course_num
                  LIMIT 9`
                  //ORDER BY username ASC
      ,(error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

const postUser = (user) => {
  return new Promise(function(resolve, reject) {
    // INSERT INTO public."public.user" (username, first_name, last_name, date_joined, email, password)
    // VALUES ('John Smith', 'John', 'Smith', current_date, 'johnsmith@notreal.com', 'johnsmithiscool')
    pool.query(`INSERT INTO public."public.user" 
            (username, first_name, last_name, date_joined, email, password)
            VALUES 
            (${user.first_name + " " + user.last_name}, ${user.first_name}, ${user.last_name}, ${user.date_joined}, ${user.email}, ${user.password})`
    ,(error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  }) 
}

const postCourse = (course) => {
  return new Promise(function(resolve, reject) {
    // pool.query(`INSERT INTO public."public.course" 
    //             (course_num, subject, course, title, divs, dept_num, sect_num, ptrm, camp, start_date, end_date, colour)
    //             VALUES 
    //             (123456, 'Math', 'MATH 3023', 'Discrete Mathematics', 1, 1, 1, 1, 1, current_timestamp, current_timestamp, '#FF1155')`
    pool.query(`INSERT INTO public."public.course" 
            (course_num, subject, course, title, divs, dept_num, sect_num, ptrm, camp, start_date, end_date, colour)
            VALUES 
            (${course.courseNum}, ${course.subject}, ${course.course}, ${course.title}, ${course.divs}, ${course.dept_num}, 
            ${course.sect_num}, ${course.ptrm}, ${course.camp}, to_timestamp(${course.start_date} / 1000.0), to_timestamp(${course.end_date} / 1000.0), ${course.colour})`
    ,(error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  }) 
}

const putCourse = (id, start, end) =>{
  return new Promise(function(resolve, reject) {
    pool.query(`UPDATE User SET created_at = (to_timestamp(${start} / 1000.0)), updated_at = (to_timestamp(${end} / 1000.0)) WHERE id = ${id}`,
    (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  }) 
}

module.exports = {
    getUsers,
    postUser,
    postCourse,
    putCourse
}