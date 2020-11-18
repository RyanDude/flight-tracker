const express = require('express');
const router = express();

const indexController = require('../controllers/indexController');

// When user makes a request to /
router.get('/', indexController.sendHome);

module.exports = router;