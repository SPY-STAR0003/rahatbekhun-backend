
const { Router } = require('express');
const { addWorksheet, showList, deleteWorksheet, editWorksheet, setEditedWorksheet, upload, deleteUploadedPicture, pdfUpload } = require('../controllers/worksheets');


const router = new Router();

router.post('/add', addWorksheet);
router.get('/list', showList);
router.delete('/delete', deleteWorksheet)
router.post('/edit', editWorksheet)
router.put('/edit', setEditedWorksheet)
router.post('/delete-picture', deleteUploadedPicture)

router.post('/upload', upload)
router.post('/upload-pdf', pdfUpload)

module.exports = router