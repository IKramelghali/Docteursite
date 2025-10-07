const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

// REGISTER PATIENT
const registerPatient = async (req, res) => {
  try {
    const { firstName, lastName, email, password, city } = req.body;

    // Vérif des champs obligatoires
    if (!firstName || !lastName || !email || !password || !city) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Vérif si l'email existe déjà
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du patient
    const newPatient = await Patient.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      city
    });



    res.status(201).json({
      message: "Patient registered successfully",
      patient: {
        id: newPatient._id,
        name: `${newPatient.firstName} ${newPatient.lastName}`,
        email: newPatient.email
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// LOGIN PATIENT
const loginPatient = async (req, res) => {
      try {
        const { email, password } = req.body
        const patientexist = await Patient.findOne({ email })


        if (!patientexist) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const ispassmatch = await bcrypt.compare(password, patientexist.password)
        if (!ispassmatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign(
            { id: patientexist._id }, process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.EXPIRE_JWT }
        )
        res.json({
            message: "login successfully",
            token,
            P: {
                _id: patientexist._id,
                name: patientexist.name,
                email: patientexist.email,
            }
        })

    } catch (error) {
        console.error("Error during login:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = { registerPatient ,loginPatient};
