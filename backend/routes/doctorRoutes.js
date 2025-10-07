const express = require("express");
const router = express.Router();
const {createDoctor,getDoctors,getDoctorById,updateDoctor,deleteDoctor} = require("../controllers/doctorController"); 

// Routes
console.log("registerDoctor:", createDoctor);

router.post("/", createDoctor);      
router.get("/", getDoctors);          
router.get("/:id", getDoctorById);    
router.put("/:id", updateDoctor);     
router.delete("/:id", deleteDoctor);   

module.exports = router;
