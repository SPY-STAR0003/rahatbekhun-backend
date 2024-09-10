const { Router } = require('express');

const { addCourse , coursesList, deleteCourse, editCourse, setEditedCourse } = require('../controllers/courses');
const { auth } = require('../controllers/admin');
const { courseCoverUpload } = require('../controllers/uploads');

const router = new Router();

router.post('/add', auth , addCourse)
router.get('/list', auth , coursesList)
router.delete('/delete', auth, deleteCourse)

router.post('/edit', auth, editCourse)
router.put('/edit', auth, setEditedCourse)

router.post('/upload', auth, courseCoverUpload)

module.exports = router