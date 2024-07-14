

const { Router } = require('express');
const { advancedSearch } = require('../controllers/search');

const router = new Router();

router.get("/", advancedSearch)

module.exports = router