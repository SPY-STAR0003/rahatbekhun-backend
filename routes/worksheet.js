
const { Router } = require('express');
const { addWorksheet } = require('../controllers/worksheets');


const router = new Router();

router.post('/add', addWorksheet)

module.exports = router