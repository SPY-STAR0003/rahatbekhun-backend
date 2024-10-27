
const { Router } = require('express');
const { addUser, showList, deleteUser, editUser, setEditedUser, singleUser } = require('../controllers/users');

const router = new Router();

router.get('/list', showList);


router.post('/add', addUser);
router.post('/edit', editUser)
router.put('/edit', setEditedUser)
router.delete('/delete', deleteUser)

router.post('/single', singleUser)


module.exports = router