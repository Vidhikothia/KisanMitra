const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes'); // Correct the path here
const cookieParser = require('cookie-parser');
const analyticsRoutes = require('./routes/analyticsRoutes');
const savedContentRoutes = require("./routes/savedContentRoutes");
const notificationRoutes = require('./routes/notificationRoutes');
const insightsRoutes = require('./routes/insightsRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// const cropRoutes = require('./routes/cropRoutes');
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // Middleware for JSON parsing
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust if frontend URL is different
    credentials: true, // ✅ Allows frontend to send cookies
  })
);
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use('/insights', insightsRoutes);

app.use("/saved-content", savedContentRoutes);
app.use('/notifications', notificationRoutes);
app.use('/subscription', subscriptionRoutes);

// Routes
app.use('/auth', authRoutes);
app.use('/content', contentRoutes);
app.use('/analytics', analyticsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
