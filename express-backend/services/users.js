const db = require('./db');
const helper = require('../public/javascripts/helper');
const config = require('../public/javascripts/config');

async function getUsers(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT username, first_name, last_name, date_joined, email FROM "user" OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data, meta
  }
} 

// curl -i -X POST -H 'Accept:application/json' -H 'Content-type:application/json' http://localhost:3000/users --data "username=smith_trey&first_name=Smith&last_name=Trey&date_joined=2022-02-02&email=s.try@gmail.com&password=777777777"

async function createUser(user) {
  const result = await db.query(
    'INSERT INTO "user" (username, first_name, last_name, date_joined, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [user.username, user.first_name, user.last_name, user.date_joined, user.email, user.password]
  );
  let message = 'Error in adding user';
  if (result.length) {
    message = 'User added successfully';
  }
  return message;
}
module.exports = {
  getUsers,
  createUser
}