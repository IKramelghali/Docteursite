const express = require("express");
const router = express.Router();
const { registerDoctor } = require("../controllers/authDoctorController");

router.post("/register", registerDoctor);


module.exports = router;
