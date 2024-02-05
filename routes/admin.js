
const { Router } = require('express');
const router = new Router();

const adminCtrls = require('./../controllers/admin');

router.post("/register", adminCtrls.addUser)

router.post("/login", adminCtrls.loginCtrl)


module.exports = router