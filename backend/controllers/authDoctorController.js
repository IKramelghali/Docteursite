const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");


//  REGISTER
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, city, specialty, phone, address, description } = req.body;

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
const loginDoctor = async (req, res) => {
      try {
        const { email, password } = req.body
        const doctorexst = await Doctor.findOne({ email })

        if (!doctorexst) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const ispassmatch = await bcrypt.compare(password, doctorexst.password)
        if (!ispassmatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign(
            { id: doctorexst._id }, process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.EXPIRE_JWT }
        )
        res.json({
            message: "login successfully",
            token,
            Doctor: {
                _id: doctorexst._id,
                name: doctorexst.name,
                email: doctorexst.email,
            }
        })
    } catch (error) {
        console.error("Error during login:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
module.exports={ registerDoctor,loginDoctor}


