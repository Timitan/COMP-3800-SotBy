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
      pool.query(`SELECT u.username, u.first_name, u.last_name, c.start_date, c.end_date, c.course_num, c.title, c.colour from "user" u
                  LEFT JOIN course_assignment ca ON u.username = ca.username
                  LEFT JOIN course c ON ca.course_num = c.course_num
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
    pool.query(`INSERT INTO "user"
            (username, first_name, last_name, date_joined, email, password)
            VALUES 
            ('${user.username}', '${user.firstname}', '${user.lastname}', to_timestamp(${user.datejoined} / 1000.0), '${user.email}', '${user.password}')`
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
    pool.query(`INSERT INTO "course"
            (course_num, subject, course, title, divs, dept_num, sect_num, ptrm, camp, start_date, end_date, colour)
            VALUES 
            (${course.number}, '${course.subject}', '${course.course}', '${course.title}', '1', 1, 
            1, 1, 1, to_timestamp(${course.start} / 1000.0), to_timestamp(${course.end} / 1000.0), 
            '${course.color}');
            INSERT INTO "course_assignment"
            (username, course_num)
            VALUES
            ('${course.instructorKey}', ${course.number})
            `
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
    pool.query(`UPDATE "course" SET start_date = (to_timestamp(${start} / 1000.0)), end_date = (to_timestamp(${end} / 1000.0)) WHERE course_num = ${id}`,
    (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  }) 
}

const deleteUser = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query(`
                DO
                $do$
                BEGIN
                  IF EXISTS (
                    SELECT * FROM "course_assignment" ca
                    WHERE ca.username = '${id}'
                  ) THEN
                      WITH deleted as 
                    (
                      DELETE FROM "course_assignment" ca
                      WHERE ca.username = '${id}'
                      RETURNING *
                    ),
                    deleted2 as
                    (
                      DELETE FROM "user" u
                      WHERE EXISTS 
                      (
                        SELECT d.username FROM deleted d
                        WHERE u.username = d.username
                      )
                      RETURNING *
                    )
                    DELETE from "course" c
                    WHERE EXISTS 
                    (
                      SELECT d.course_num FROM deleted d
                      WHERE c.course_num = d.course_num
                    )
                    ;
                  ELSE
                      DELETE from "user" u
                    WHERE u.username = '${id}';
                  END IF;
                END
                $do$
                `,
    (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  }) 
}

const deleteCourse = (courseId, userId) => {
  return new Promise(function(resolve, reject) {
    pool.query(`
                DELETE FROM "course_assignment" ca
                WHERE ca.course_num = ${courseId} 
                AND ca.username = '${userId}';
    
                DELETE FROM "course" c
                WHERE c.course_num = '${courseId}'
                `,
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
    deleteUser,
    postCourse,
    putCourse,
    deleteCourse
}