const db = require('./db');
const helper = require('../public/javascripts/helper');
const config = require('../public/javascripts/config');

async function getVacations(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT vacation_id, username, start_date, end_date, duration FROM "vacation" OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data, meta
  }
} 

// curl -i -X POST -H 'Accept:application/json' -H 'Content-type:application/json' http://localhost:3000/vacations --data "vacation_id=6&username=smith_trey&start_date=2022-10-01&end_date=2022-10-25&duration=25"

async function createVacation(vacation) { 
  const result = await db.query(
    'INSERT INTO "vacation" (vacation_id, username, start_date, end_date, duration) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [vacation.vacation_id, vacation.username, vacation.start_date, vacation.end_date, vacation.duration]
  );
  let message = 'Error in adding vacation';
  if (result.length) {
    message = 'Vacation added successfully';
  }
  return message;
}
module.exports = {
  getVacations,
  createVacation
}