const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 🔒 should be hashed
  address: { type: String },
  description: { type: String },
  averageRating: { type: Number, default: 0 },

  // relations
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  specialty: { type: mongoose.Schema.Types.ObjectId, ref: "Specialty", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
