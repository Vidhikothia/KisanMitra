const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Educator = require('../models/Educator');
const Admin = require("../models/Admin");
require('dotenv').config();
const twilio = require('twilio');


// Function to create JWT token
const generateToken = async (user) => {
  const educator = await Educator.findOne({ user_id: user._id });
  const admin = await Admin.findOne({ user_id: user._id });
    return jwt.sign(
      {
        userId: user._id,
        role: user.role,
        preferred_language: user.preferred_language,
        isPremium: user.isPremium,
        educatorId: educator ? educator._id : null,
        adminId: admin ? admin._id : null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  };

  const register = async (req, res) => {
    try {
      const { username, email,phone_number , password, role, preferred_language,state, city } = req.body;
  
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
        state: state || null, // Assign null if not provided
        city: city || null,
      });
      
       // ✅ If user is Admin, create an entry in Admin model
       if (role === "Admin") {
        await Admin.create({ user_id: user._id });
    }

      // Generate token & send response
      const token = await generateToken( user);
      res.status(201).json({ message: "User registered successfully", user,token });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  };

//   const login = async (req, res) => {
//     try {
//         const { email, password, rememberMe } = req.body; // Added rememberMe

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: "Invalid email" });
//         }

//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid password" });
//         }

//         // Generate token & send response
//         const token = await generateToken(user);
//         console.log(token);
//         // Set cookie with dynamic maxAge based on "Remember Me"
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: rememberMe 
//                 ? 2 * 24 * 60 * 60 * 1000 // 30 days
//                 : 1 * 24 * 60 * 60 * 1000,  // 7 days
//         });

//         res.json({ message: "Login successful", user, token });
//     } catch (error) {
//         res.status(500).json({ message: "Error logging in", error: error.message });
//     }
// };
const login = async (req, res) => {
  try {
      const { email, password, rememberMe } = req.body; // Extract data

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: "Invalid email" });
      }

      // Ensure password is a string before comparing
      const isMatch = await bcrypt.compare(String(password), user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
      }

      // Generate JWT token
      const token = await generateToken(user);

      // Set cookie with dynamic expiration
      res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: rememberMe 
              ? 30 * 24 * 60 * 60 * 1000 // 30 days
              : 7 * 24 * 60 * 60 * 1000,  // 7 days
      });

      res.json({ message: "Login successful", user, token });

  } catch (error) {
      res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// In-memory storage for OTP (for demo purposes only)
let verificationCode;

// 📲 Send OTP to Mobile
const sendOtp = async (req, res) => {
    const { phone_number } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    try {
        // Send OTP using Twilio
        await client.messages.create({
            body: `Your OTP code is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone_number,
        });

        // Store OTP for verification (consider using a database with an expiration strategy)
        verificationCode = otp;

        res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        res.status(500).json({ message: 'Error sending OTP' });
    }
};

// 🔢 Verify OTP and Authenticate User
const verifyOtp = async (req, res) => {
    const { phone_number, otp,rememberMe } = req.body;

    // Verify OTP
    if (otp == verificationCode) {
        try {
            // Check if user exists, otherwise create a new user
            let user = await User.findOne({ phone_number });
            if (!user) {
                user = new User({ phone_number });
                await user.save();
            }

            // Generate JWT Token
            const token =await generateToken(user);

            // Set cookie with dynamic maxAge based on "Remember Me"
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: rememberMe 
                    ? 30 * 24 * 60 * 60 * 1000 // 30 days
                    : 7 * 24 * 60 * 60 * 1000,  // 7 days
            });
    

            res.json({ token, message: 'OTP verified successfully!' });
        } catch (error) {
            console.error('Error during user verification:', error.message);
            res.status(500).json({ message: 'Error verifying OTP' });
        }
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};
  
  // ✅ **User Logout**
  // const logout = (req, res) => {
  //   res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  //   res.json({ message: "Logged out successfully" });
  // };
  const logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "Strict" }); // Clear token cookie
    res.status(200).json({ message: "Logged out successfully" });
  };
  
  
  module.exports = { register, login, sendOtp ,verifyOtp, logout };