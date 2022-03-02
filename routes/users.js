/* Error Messages */
const gettingUserMSG = `Error while getting users`
const creatingUserMSG = `Error while posting a new user `;

const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getUsers(req.query.page));
  } 
  catch (err) {
    console.error(gettingUserMSG, err.message);
    next(err);
  }
});
/* POST new user */
router.post('/', async function(req, res, next) {
  try {
    res.json(await users.createUser(req.body));
  } catch (err) {
    console.error(creatingUserMSG, err.message);
    next(err);
  }
});

module.exports = router;