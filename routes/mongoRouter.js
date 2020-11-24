const express = require('express');
const router = express();

const mongoController = require('../controllers/mongoController');

// Set default API response
router.get('/test', function (req, res) {
    res.json({
        status: 'API is working',
        message: '/mongo to view stuff',
    });
});

// routes
router.route('/')
    .get(mongoController.index)
    .post(mongoController.new);


module.exports = router;