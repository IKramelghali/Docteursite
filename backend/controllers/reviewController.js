const Review = require("../models/review");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

// Create a review
const createReview = async (req, res) => {
  try {
    const { rating, comment, doctor, patient } = req.body;

    if (!rating || !doctor || !patient) {
      return res.status(400).json({ message: "Rating, doctor, and patient are required" });
    }


    const foundDoctor = await Doctor.findById(doctor);
    const foundPatient = await Patient.findById(patient);
    if ( !foundPatient) {
      return res.status(404).json({ message: "you should  register" });
    }

    const review = await Review.create({ rating, comment, doctor, patient });

    const reviews = await Review.find({ doctor });
    const avg =
      reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
    foundDoctor.averageRating = avg;
    await foundDoctor.save();

    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get all reviews (optionally by doctor)
const getReviews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.doctor) filter.doctor = req.query.doctor;

    const reviews = await Review.find(filter)
      .populate("doctor", "name email")
      .populate("patient", "firstName lastName");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("doctor", "name")
      .populate("patient", "firstName lastName");

    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  Delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get reviews by id patient
const getReviewsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params; // from URL like /api/reviews/patient/:patientId

    const reviews = await Review.find({ patient: patientId })
      .populate("doctor", "name email")
      .populate("patient", "firstName lastName");

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this patient" });
    }

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews by patient:", err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports={  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
getReviewsByPatient}
