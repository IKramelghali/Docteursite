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

//  Delete specialty
const deleteSpecialty = async (req, res) => {
  try {
    const deleted = await Specialty.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Specialty not found" });
    }
    res.status(200).json({ message: "Specialty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports={addSpecialty,getSpecialtyById,deleteSpecialty}
