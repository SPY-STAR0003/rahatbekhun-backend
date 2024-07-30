
const { Router } = require('express');
const { addWorksheet, showList, deleteWorksheet, editWorksheet, setEditedWorksheet, singleWorksheet } = require('../controllers/worksheets');
const { upload, pdfUpload, deleteUploadedPicture } = require('../controllers/uploads');


const router = new Router();

router.get('/list', showList);


router.post('/add', addWorksheet);
router.post('/edit', editWorksheet)
router.put('/edit', setEditedWorksheet)
router.delete('/delete', deleteWorksheet)

router.post('/single', singleWorksheet)

router.post('/upload', upload)
router.post('/upload-pdf', pdfUpload)
router.post('/delete-picture', deleteUploadedPicture)

module.exports = router