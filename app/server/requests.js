const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password123",
    database: "sotby"
})

pool.connect();

const getUsers = (year) => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT u.username, u.first_name, u.last_name, u.row_num, ca.ca_id, ca.start_date, ca.end_date, c.title, c.colour, v.start_date as vacation_start, v.end_date as vacation_end, v.vacation_id, v.approved from "user" u
                  LEFT JOIN course_assignment ca ON u.username = ca.username
                  LEFT JOIN course c ON ca.course_num = c.course_num
                  LEFT JOIN vacation v ON v.username = u.username
                  ORDER BY u.date_joined`
      //ORDER BY username ASC
      , (error, results) => {
        if (error || !results) {
          reject(error)
        }
        resolve(results.rows);
      })
  })
}

const getCourses = () => {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT c.course_num, c.title from "course" c`
      , (error, results) => {
      if (error || !results) {
        reject(error)
      }
        resolve(results.rows);
    })
  });
}

const postUser = (user) => {
  return new Promise(function (resolve, reject) {
    // INSERT INTO public."public.user" (username, first_name, last_name, date_joined, email, password)
    // VALUES ('John Smith', 'John', 'Smith', current_date, 'johnsmith@notreal.com', 'johnsmithiscool')
    pool.query(`INSERT INTO "user"
            (username, first_name, last_name, date_joined, admin, email, password)
            VALUES 
            ('${user.username}', '${user.firstname}', '${user.lastname}', 
            to_timestamp(${user.datejoined} / 1000.0), '${0}', '${user.email}', 
            '${user.password}')`
      , (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
      })
  })
}

const postCourse1 = (course) => {
  return new Promise(function (resolve, reject) {
    console.log(course);
    console.log(course.course_num);
    pool.query(`INSERT INTO "course"
            (course_num, subject, course, title, start_date, end_date, colour)
            VALUES 
            (${parseInt(course.course_num)}, '${course.subject}', ${parseInt(course.course)}, '${course.title}', 
            '${course.end_date}', '${course.start_date}', '${course.colour}')`
    ,(error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  }) 
}

// **PREVIOUS COURSE ASSIGNMENT**

const postCourseAssignment = (course) => {
  return new Promise(function (resolve, reject) {
    pool.query(`
            INSERT INTO "course_assignment"
            (username, course_num, start_date, end_date)
            VALUES
            ('${course.instructorKey}', ${course.number}, 
            to_timestamp(${course.start} / 1000.0), to_timestamp(${course.end} / 1000.0))
            RETURNING ca_id;
            `
      , (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows[0].ca_id);
      })
  })
}

const putCourse = (username, id, start, end) => {
  return new Promise(function (resolve, reject) {
    pool.query(`UPDATE "course_assignment" 
    SET start_date = (to_timestamp(${start} / 1000.0)), end_date = (to_timestamp(${end} / 1000.0)) 
    WHERE ca_id = ${id}`,
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
  })
}

const getUser = (username) => {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT u.username from "user" u
                WHERE u.username = '${username}'
                `
    ,(error, results) => {
      if (error) {
        reject(error)
      }
      if(results.rows == 0) {
        reject("User doesn't exist");
      } else {
        resolve(results.rows);
      }
    })
  }) 
}

const deleteUser = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(`
                DELETE from "user" u
                WHERE u.username = '${id}';
                `,
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
  })
}

const deleteCourse = (courseId) => {
  return new Promise(function (resolve, reject) {
    pool.query(`
                DELETE FROM "course_assignment" ca
                WHERE ca.ca_id = ${courseId} 
                `,
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
  })
}

// Vacations
// const getVacationsApproved = (username) => {
//   return new Promise(function(resolve, reject) {
//       pool.query(`SELECT v.username, v.start_date, v.end_date, v.duration from "vacation" v
//                   WHERE v.username = '${username}' AND v.approved = 1`
//       ,(error, results) => {
//         if (error) {
//           reject(error)
//         }
//         resolve(results.rows);
//       })
//     }) 
// }

const getVacationsApproved = () => {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT v.username, v.start_date, v.end_date, v.duration from "vacation" v
                  WHERE v.approved = 1`
      , (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
  })
}

const getAllVacationsNotApproved = () => {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT v.vacation_id, v.username, v.start_date, v.end_date, v.duration from "vacation" v
                  WHERE v.approved = 0`
      , (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
  })
}

const approveVacation = (vacation) => {
  console.log("request approve vacation")
  return new Promise(function (resolve, reject) {
    pool.query(`UPDATE "vacation"
    SET approved = 1
    WHERE vacation_id = '${vacation.vacation_id}'`,
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
  })
}

const postVacation = (vacation) => {
  return new Promise(function (resolve, reject) {
    pool.query(`INSERT INTO "vacation" 
                  (username, start_date, end_date, duration, approved)
                  VALUES
                  ('${vacation.username}', to_timestamp(${vacation.start_date} / 1000),to_timestamp(${vacation.end_date} / 1000),'${vacation.duration}', 0)`
      , (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
      })
  })
}

const deleteVacation = (vacation) => {
  return new Promise(function (resolve, reject) {
    pool.query(`DELETE FROM "vacation" v
                WHERE v.vacation_id = '${vacation.vacation_id}'`,
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
  })
}

// Login
const login = (user) => {
  return new Promise(function(resolve, reject) {
      pool.query(`SELECT username, first_name, last_name, admin, password FROM "user" WHERE username = '${user.username}'`,
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
      })
    }) 
}

module.exports = {
  getUsers,
  postUser,
  deleteUser,
  postCourseAssignment,
  postCourse1,
  putCourse,
  deleteCourse,
  getUser,
  getVacationsApproved,
  getAllVacationsNotApproved,
  approveVacation,
  postVacation,
  deleteVacation,
  login,
  getCourses
}