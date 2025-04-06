// routes/analyticsRoutes.js
const express = require('express');
const WebsiteAnalytics = require('../models/WebsiteAnalytics');
const User = require('../models/User');
const Educator = require("../models/Educator");
const router = express.Router();

// Get website opened count
// Get monthly registration stats for users and educators
router.get('/monthly-growth', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    // Aggregate monthly users
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    // Aggregate monthly educators
    const educatorGrowth = await Educator.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    // Initialize arrays for all months (Jan to Dec)
    const labels = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const userCounts = Array(12).fill(0);
    const educatorCounts = Array(12).fill(0);

    // Fill counts from aggregation result
    userGrowth.forEach(entry => {
      userCounts[entry._id - 1] = entry.count;
    });
    educatorGrowth.forEach(entry => {
      educatorCounts[entry._id - 1] = entry.count;
    });

    res.status(200).json({
      labels,
      userGrowth: userCounts,
      educatorGrowth: educatorCounts
    });
  } catch (err) {
    console.error("Error fetching monthly growth:", err);
    res.status(500).json({ message: "Failed to fetch monthly growth", error: err.message });
  }
});

router.get('/website-count', async (req, res) => {
  try {
    const data = await WebsiteAnalytics.findOne();
    if (!data) {
      const newData = new WebsiteAnalytics({ websiteOpenedCount: 1 });
      await newData.save();
      return res.status(200).json({ websiteOpenedCount: 1 });
    }
    res.status(200).json({ websiteOpenedCount: data.websiteOpenedCount });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving count' });
  }
});

// Increment website opened count
router.post('/increment-count', async (req, res) => {
  try {
    const data = await WebsiteAnalytics.findOne();
    if (data) {
      data.websiteOpenedCount += 1;
      await data.save();
      return res.status(200).json({ message: 'Count incremented', websiteOpenedCount: data.websiteOpenedCount });
    } else {
      const newData = new WebsiteAnalytics({ websiteOpenedCount: 1 });
      await newData.save();
      return res.status(200).json({ message: 'Count initialized', websiteOpenedCount: 1 });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error incrementing count' });
  }
});
router.get("/total-users", async (req, res) => {
  try {
      const totalUsers = await User.countDocuments(); // Count total users
      res.status(200).json({ totalUsers });
  } catch (error) {
      console.error("Error fetching total users:", error);
      res.status(500).json({ message: "Failed to fetch total users", error: error.message });
  }
});
router.get("/total-educators", async (req, res) => {
  try {
      const totalEducators = await Educator.countDocuments(); // Count total educators
      res.status(200).json({ totalEducators });
  } catch (error) {
      console.error("Error fetching total educators:", error);
      res.status(500).json({ message: "Failed to fetch total educators", error: error.message });
  }
});
module.exports = router;
