const express = require("express");
const { register, login, logout } = require("../controllers/authcontroller");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

module.exports = router;
