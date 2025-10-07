const express = require("express");
const {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewsByPatient,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/", createReview);
router.get("/", getReviews);
router.get("/patient/:patientId", getReviewsByPatient);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
