const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getResources(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT model_num, model_name, quantity_total, quantity_left, model_location FROM "resource" OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data, meta
  }
} 

// curl -i -X POST -H 'Accept:application/json' -H 'Content-type:application/json' http://localhost:3000/resources --data "model_num=DMN666&model_name=Welding+Torch+L&quantity_total=15&quantity_left=3&model_location=T2928"

async function createResource(resource) {
  const result = await db.query(
    'INSERT INTO "resource" (model_num, model_name, quantity_total, quantity_left, model_location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [resource.model_num, resource.model_name, resource.quantity_total, resource.quantity_left, resource.model_location]
  );
  let message = 'Error in adding resource';
  if (result.length) {
    message = 'Resource added successfully';
  }
  return message;
}
module.exports = {
  getResources,
  createResource
}