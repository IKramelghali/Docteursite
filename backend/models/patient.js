const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } ,
  //Relations
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
