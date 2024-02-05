
const { Router } = require('express');
const router = new Router();

const adminCtrls = require('./../controllers/admin');

router.post("/register", adminCtrls.addUser)

router.post("/login", (req, res) => {
    res.status(200).json({
        message : "Hello World !"
    })
})


module.exports = router