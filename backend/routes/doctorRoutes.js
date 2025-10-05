const express = require("express");
const router = express.Router();
const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require("../controllers/doctorController"); 

// Routes 
router.post("/", createDoctor);      
router.get("/", getDoctors);          
router.get("/:id", getDoctorById);    
router.put("/:id", updateDoctor);     
router.delete("/:id", deleteDoctor);   

module.exports = router;
