const express = require("express");
const router = express.Router();
const {
  addSpecialty,
  getSpecialtyById,
  deleteSpecialty,
} = require("../controllers/specialityController");

router.post("/", addSpecialty); 
router.get("/:id", getSpecialtyById); 
router.delete("/:iddelete", deleteSpecialty); 

module.exports = router;
