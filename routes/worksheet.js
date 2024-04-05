
const { Router } = require('express');
const { addWorksheet, showList, deleteWorksheet } = require('../controllers/worksheets');


const router = new Router();

router.post('/add', addWorksheet);
router.get('/list', showList);
router.delete('/delete', deleteWorksheet)

module.exports = router