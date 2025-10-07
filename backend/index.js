const express = require("express")
const connectdata = require('./config/db.js')
const app = express();

require("dotenv").config()
//connectdb
connectdata()
app.use(express.json());
//routes
const cityRoutes = require("./routes/cityRoutes.js");
app.use("/api/city", cityRoutes);
const specialtyRoutes = require("./routes/specialityRoutes.js");
app.use("/api/speciality", specialtyRoutes);
const authdoctorRoutes = require("./routes/authDoctorRoutes.js");
app.use("/api/authdoctor", authdoctorRoutes);
const doctorRoutes = require("./routes/doctorRoutes.js");
app.use("/api/doctor", doctorRoutes);
const authPatientRoutes = require("./routes/authPatientRoutes");
app.use("/api/authpatient", authPatientRoutes);
const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/reviews", reviewRoutes);



app.get("/", (req, res) => {
    res.end("<h1>HELLO postman</h1>")
})

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});