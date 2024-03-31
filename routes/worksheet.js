
const { Router } = require('express');
const { addWorksheet, showList } = require('../controllers/worksheets');


const router = new Router();

router.post('/add', addWorksheet);
router.get('/list', showList)

module.exports = router