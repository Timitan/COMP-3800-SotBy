const express = require('express');
const router = express.Router();
const instructors = require('../services/instructors');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await instructors.getMultiple(req.query.page));
  } 
  catch (err) {
    console.error(`Error while getting instructors`, err.message);
    next(err);
  }
});

module.exports = router;