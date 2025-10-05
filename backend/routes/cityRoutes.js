const express = require("express");
const router = express.Router();
const { createCity,getCities,deleteCity } = require("../controllers/cityController");

// Create a new city
router.post("/", createCity);

// Get all cities
router.get("/cities", getCities);

// Delete a city by ID
router.delete("/:id", deleteCity);

module.exports = router;
