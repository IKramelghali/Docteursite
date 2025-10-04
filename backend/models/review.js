const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  reviewDate: { type: Date, default: Date.now },

  // relations
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
