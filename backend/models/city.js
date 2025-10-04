const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: { type: String, required: true, trim:true },
  postalCode: { type: String }
});

module.exports = mongoose.model("City", citySchema);
