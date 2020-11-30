const express = require('express');
const router = express();

const flightController = require('../controllers/flightController');
const mongoController = require('../controllers/mongoController');

// Goes to /api/flights/whatever
// Get all flights
router.route('/')
    .get(mongoController.viewall)

// Get flight based on id
router.route('/:id')
    .get(mongoController.viewid)

// Get n previous flights
router.route('/previous/:limit')
    .get(mongoController.previousNflights)

router.post('/', flightController.getFlights);

module.exports = router;