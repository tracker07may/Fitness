const express = require("express");
require("dotenv").config();
const cors = require("cors");

const userRoutes = require("./Routes/Route");
const connectDB = require("./database");    
const User = require("./Models/User");    

const app = express();
const port = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());

// Routes
app.use("/web/", userRoutes);

const insertSampleUser = async () => {
  try {
    await User.create({
      name: "Moheeb",
      email: "moheeb@gmail.com",
      password: "123456",
      age: 22,
      gender: "Male",
      height: 175,
      weight: 70,
      fitnessGoal: "Lose Weight"
    });
    console.log("Sample user inserted");
  } catch (err) {
    console.error("Insert failed:", err.message);
  }
};

// DB connect and start server
connectDB()
  .then(() => {
  
    app.listen(port, () => {
      console.log(`✅ Server is running at http://localhost:${port}/web`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
  });
