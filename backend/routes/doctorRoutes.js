const express = require("express");
const router = express.Router();
const {getDoctors,getDoctorById,updateDoctor,deleteDoctor} = require("../controllers/doctorController"); 
const upload = require("../middleware/multer");

// Routes

router.get("/", getDoctors);          
router.get("/:id", getDoctorById);    
router.put("/:id", upload.single("profile"), updateDoctor);     
router.delete("/:id", deleteDoctor);   

module.exports = router;
