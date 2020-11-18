const express = require('express');
const router = express();

const flightController = require('../controllers/flightController');

router.post('/', flightController.getFlights);

module.exports = router;