
const { Router } = require('express');
const router = new Router();

const profileCtrl = require('../controllers/profile');

router.post("/edit", profileCtrl.editUser)
router.put("/edit", profileCtrl.setEditedUser)

router.put('/avatar', profileCtrl.avatarChanger)
router.put('/pass-change', profileCtrl.passChanger)

module.exports = router