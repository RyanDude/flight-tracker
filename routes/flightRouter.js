const express = require('express');
const router = express();

const flightController = require('../controllers/flightController');

router.get('/', (req, res) => {
    res.json(flightController.getFlights);
});
router.post('/', flightController.getFlights);

module.exports = router;