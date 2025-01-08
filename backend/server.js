const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Correct the path here
const cropRoutes = require('./routes/cropRoutes');
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api', userRoutes);
app.use('/auth', authRoutes);
app.use('/api/crops', cropRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
