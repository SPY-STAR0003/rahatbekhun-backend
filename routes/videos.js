const { Router } = require('express');

const { addVideo , videosList, deleteVideo, editVideo, setEditedVideo } = require('../controllers/videos');
const { auth } = require('../controllers/admin');
const { courseCoverUpload } = require('../controllers/uploads');

const router = new Router();

router.post('/add', auth , addVideo)
router.get('/list', auth , videosList)
router.delete('/delete', auth, deleteVideo)


router.post('/edit', auth, editVideo)
router.put('/edit', auth, setEditedVideo)

module.exports = router