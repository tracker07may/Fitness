const User = require("../Models/User");
let bcrypt = require("bcrypt");
let nodemailer = require("nodemailer");

let email_info = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSKEY
  }
})
const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, gender, height, weight, fitnessGoal } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
let passwordenc= bcrypt.hashSync(password,12)
    const newUser = new User({

      name,
      email,
      password:passwordenc,
      age,
      gender,
      height,
      weight,
      fitnessGoal
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

let  Email_Body={
  to:email,
  from: process.env.EMAIL,
  Subject : "Registered Successfully",
  html: `<h3>Hi ${name}<br/><br/> your Account has been resgistered successfully, Congragulations.<br/>
        <a href='http://localhost:3002/web/i'>Continue on Website</a>       
  </h3>`
        
}
email_info.sendMail(Email_Body,function(error,info){
  if (error){
    console.log(error.message)
  }else{
    console.log("Email has been sent Successfully")
  }
})


  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Users Controller
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user ) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
 let ver= bcrypt.compareSync(password,user.password)
 if (!ver) {
  return res.status(401).json({ error: "Invalid password" });
  }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  registerUser,
  getAllUsers,
  loginUser
};
