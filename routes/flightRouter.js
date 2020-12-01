const express = require('express');
const router = express();

const flightController = require('../controllers/flightController');
const mongoController = require('../controllers/mongoController');

// Goes to /flights/whatever
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

// User must enter a lat/long/distance in order to get current flights around them
router.post('/current', flightController.getFlights);

module.exports = router;