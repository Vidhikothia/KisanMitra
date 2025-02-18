const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

// Function to create JWT token
const generateToken = (user) => {
    return jwt.sign(
      {
        userId: user._id,
        role: user.role,
        preferred_language: user.preferred_language,
        isPremium: user.isPremium,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  
    // Set token in HTTP-only cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });
  };

  const register = async (req, res) => {
    try {
      const { username, email,phone_number , password, role, preferred_language } = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await User.create({
        username,
        email,
        phone_number,
        password:hashedPassword,
        role,
        preferred_language,
        
      });
  
      // Generate token & send response
      const token = generateToken( user);
      

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.status(201).json({ message: "User registered successfully", user,token });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email" });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // Generate token & send response
      const token = generateToken( user);
      

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.json({ message: "Login successful", user,token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  };
  
  // ✅ **User Logout**
  const logout = (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.json({ message: "Logged out successfully" });
  };
  
  module.exports = { register, login, logout };