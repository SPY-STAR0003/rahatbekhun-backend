const { Router } = require('express');

const { addVideo } = require('../controllers/videos');
const { auth } = require('../controllers/admin');

const router = new Router();

router.post('/add', auth , addVideo)

module.exports = router