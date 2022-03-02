/* Error Messages */
const gettingVacationMSG = `Error while getting vacations`
const creatingVacationMSG = `Error while posting a new vacation `;

const express = require('express');
const router = express.Router();
const vacations = require('../services/vacations');

/* GET vacations listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await vacations.getVacations(req.query.page));
  } 
  catch (err) {
    console.error(gettingVacationMSG, err.message);
    next(err);
  }
});
/* POST new vacation */
router.post('/', async function(req, res, next) {
  try {
    res.json(await vacations.createVacation(req.body));
  } catch (err) {
    console.error(creatingVacationMSG, err.message);
    next(err);
  }
});

module.exports = router;