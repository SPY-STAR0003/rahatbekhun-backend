const { Router } = require('express');

const { addVideo , videosList, deleteVideo } = require('../controllers/videos');
const { auth } = require('../controllers/admin');

const router = new Router();

router.post('/add', auth , addVideo)
router.get('/list', auth , videosList)
router.delete('/delete', auth, deleteVideo)

module.exports = router