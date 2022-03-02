/* Error Messages */
const gettingResourceMSG = `Error while getting resources`
const creatingResourceMSG = `Error while posting a new resource `;

const express = require('express');
const router = express.Router();
const resources = require('../services/resources');

/* GET resources listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await resources.getResources(req.query.page));
  } 
  catch (err) {
    console.error(gettingResourceMSG, err.message);
    next(err);
  }
});
/* POST new resource */
router.post('/', async function(req, res, next) {
  try {
    res.json(await resources.createResource(req.body));
  } catch (err) {
    console.error(creatingResourceMSG, err.message);
    next(err);
  }
});

module.exports = router;