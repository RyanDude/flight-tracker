// TODO:
// Query db to get previous flights
Flight = require("../models/flightModel");
let previousFlights = [];

exports.viewall = function (req, res) {
    Flight.get(function (err, flights) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Flights retrieved successfully",
            data: flights,
        });
        previousFlights = flights;
        console.log(`Flights retrieved successfully: ${previousFlights}`);
        return previousFlights;
    });
};