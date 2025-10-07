const Specialty = require("../models/speciality");

// Add specialty
const addSpecialty = async (req, res) => {
  try {
    const { specialtyName, description } = req.body;

    if (!specialtyName) {
      return res.status(400).json({ message: "Specialty name is required" });
    }

    const exists = await Specialty.findOne({ specialtyName });
    if (exists) {
      return res.status(400).json({ message: "Specialty already exists" });
    }

    const specialty = await Specialty.create({ specialtyName, description });
    res.status(201).json({ message: "Specialty added successfully", specialty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get specialty by ID
const getSpecialtyById = async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      return res.status(404).json({ message: "Specialty not found" });
    }
    res.status(200).json(specialty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  get all specialties
const getAllSpecialties = async (req, res) => {
  try {
    console.log("dkhel hna");
const specialties = await Specialty.find().sort({ specialtyName: 1 }); 
    if (!specialties.length) {
      return res.status(404).json({ message: "No specialties found" });
    }
    res.json(specialties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports={addSpecialty,getSpecialtyById,getAllSpecialties}
