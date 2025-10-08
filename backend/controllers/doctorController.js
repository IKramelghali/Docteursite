const Doctor = require("../models/doctor");
const cloudinary = require("../config/cloudinary");



// Get all doctors (with city & specialty populated)
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("city", "cityName postalCode")
      .populate("specialty", "specialtyName");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("city", "cityName")
      .populate("specialty", "specialtyName");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update doctor by ID
const updateDoctor = async (req, res) => {
  try {
    const updateData = { ...req.body };
    console.log(req.body);

    if (req.file) {
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "doctor_profiles" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(buffer);
        });
      };

      const uploadResult = await streamUpload(req.file.buffer);
      updateData.profile = uploadResult.secure_url;
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};


// Delete doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports={getDoctors,getDoctorById,updateDoctor,deleteDoctor}
