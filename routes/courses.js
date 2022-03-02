/* Error Messages */
const gettingCourseMSG = `Error while getting courses`
const creatingCourseMSG = `Error while posting a new course `;

const express = require('express');
const router = express.Router();
const courses = require('../services/courses');

/* GET courses listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await courses.getCourses(req.query.page));
  } 
  catch (err) {
    console.error(gettingCourseMSG, err.message);
    next(err);
  }
});
/* POST new course */
router.post('/', async function(req, res, next) {
  try {
    res.json(await courses.createCourse(req.body));
  } catch (err) {
    console.error(creatingCourseMSG, err.message);
    next(err);
  }
});

module.exports = router;