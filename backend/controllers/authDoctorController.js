const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");

//  REGISTER
const registerDoctor = async (req, res) => {
      console.log("Register endpoint hit!");

  try {
    const { name,profile, email, password, city, specialty, phone, address, description } = req.body;

    if (!name || !email || !password || !city || !specialty || !phone  ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = await Doctor.create({
      name,
      profile,
      email,
      password: hashedPassword,
      city,
      specialty,
      phone,
      address,
      description,
    });



    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: {
        id: newDoctor._id,
        name: newDoctor.name,
        email: newDoctor.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  LOGIN

 module.exports={ registerDoctor

 }


