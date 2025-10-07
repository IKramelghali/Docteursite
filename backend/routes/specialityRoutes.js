const express = require("express");
const router = express.Router();
const {
  addSpecialty,
  getSpecialtyById,
  getAllSpecialties,
} = require("../controllers/specialityController");

router.post("/", addSpecialty); 
router.get("/bulk", getAllSpecialties); 
router.get("/:id", getSpecialtyById); 

module.exports = router;
