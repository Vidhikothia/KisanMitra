// const express = require("express");
// const { register, login, logout } = require("../controllers/authcontroller");
// const protect = require("../middleware/authMiddleware");
// const userRoutes = require('./routes/userRoutes');

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/profile", protect, (req, res) => {
//   res.json({ message: "Protected route accessed", user: req.user });
// });
// router.use('/user', userRoutes);

// module.exports = router;
const express = require("express");
const {
  register,
  login,
 // googleLogin,
  sendOtp,
  verifyOtp,
  logout,
} = require("../controllers/authcontroller.js");
const protect = require("../middleware/authMiddleware");
const userRoutes = require("./userRoutes");

const router = express.Router();

// 🆕 User Registration
router.post("/register", register);

// 📧 Email & Password Login
router.post("/login", login);

// 🌐 Google Login
//router.post("/google-login", googleLogin);

// 📱 Send OTP for Mobile Login
router.post("/send-otp", sendOtp);

// 🔢 Verify OTP for Mobile Login
router.post("/sms-login", verifyOtp);

// 🚪 User Logout
router.post("/logout", logout);

// 🔒 Protected Route
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user , token : req.decoded});
});

// 👤 User Routes
router.use("/user", userRoutes);

module.exports = router;
