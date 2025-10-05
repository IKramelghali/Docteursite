const mongoose = require("mongoose");

const specialtySchema = new mongoose.Schema({
  specialtyName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: "No description provided"
  }
});

module.exports = mongoose.model("Specialty", specialtySchema);
