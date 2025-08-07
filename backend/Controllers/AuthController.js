const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists. You can log in.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errorMessage = "Auth failed: email or password is incorrect.";

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordEqual) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      {
        email: existingUser.email,
        _id: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email: existingUser.email,
      name: existingUser.name,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = { signup, login };
