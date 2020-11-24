const mongoose = require("mongoose");

// Setup schema
let flightSchema = mongoose.Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  originCountry: String,
  callsign: String,
  heading: Number,
});

// VALIDATION?
// validate: async (value) => {
//     try {
//         const result = await userModel.findOne({ id: value })
//         if (result) throw new Error("duplicity detected: id :" + value);
//     } catch (error) {
//         throw new Error(error);
//     }
// }

// Export Flight model
let Flight = (module.exports = mongoose.model("flight", flightSchema));
module.exports.get = function (callback, limit) {
  Flight.find(callback).limit(limit);
};
