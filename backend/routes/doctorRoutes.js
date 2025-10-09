const express = require("express");
const router = express.Router();
const {getDoctors,getDoctorById,updateDoctor,deleteDoctor} = require("../controllers/doctorController"); 
const upload = require("../middleware/multer");
const {authMiddleware}=require("../middleware/authMiddleware")

// Routes

router.get("/", getDoctors);          
router.get("/:id", getDoctorById);    
router.put("/:id",authMiddleware, upload.single("profile"), updateDoctor);     
router.delete("/:id",authMiddleware, deleteDoctor);   

module.exports = router;
