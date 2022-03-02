const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getCourses(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT course_num, subject, course, title, divs, dept_num, sect_num, ptrm, camp, start_date, end_date, colour FROM "course" OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data, meta
  }
} 

// curl -i -X POST -H 'Accept:application/json' -H 'Content-type:application/json' http://localhost:3000/courses --data "course_num=4959&subject=Paradigms&course=COMP4959&title=Application+of+Programming+Paradigms&divs=1&dept_num=1&sect_num=1&ptrm=1&camp=1&start_date=2022-08-01&end_date=2022-08-05&colour=black"

async function createCourse(course) {
  const result = await db.query(
    'INSERT INTO "course" (course_num, subject, course, title, divs, dept_num, sect_num, ptrm, camp, start_date, end_date, colour) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
    [course.course_num, course.subject, course.course, course.title, course.divs, course.dept_num, course.sect_num, course.ptrm, course.camp, course.start_date, course.end_date, course.colour]
  );
  let message = 'Error in adding course';
  if (result.length) {
    message = 'Course added successfully';
  }
  return message;
}
module.exports = {
  getCourses,
  createCourse
}