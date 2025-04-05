const express = require("express");
const router = express.Router();
const SavedContent = require("../models/Saved_content");

// Save a video to user's saved content
router.post("/save", async (req, res) => {
  const { user_id, content_id } = req.body;
  
  try {
    // Check if already saved
    const existingSave = await SavedContent.findOne({ user_id, content_id });
    if (existingSave) {
      return res.status(400).json({ message: "Already saved" });
    }

    const newSavedContent = new SavedContent({ user_id, content_id });
    await newSavedContent.save();
    res.json({ success: true, message: "Content saved successfully!" });
  } catch (error) {
    console.error("Error saving content:", error);
    res.status(500).json({ error: "Failed to save content" });
  }
});

// Get saved content for a user
router.get("/:userId", async (req, res) => {
  try {
    const savedVideos = await SavedContent.find({ user_id: req.params.userId })
      .populate("content_id") // Populating content details
      .exec();
    
    res.json(savedVideos);
  } catch (error) {
    console.error("Error fetching saved content:", error);
    res.status(500).json({ error: "Failed to fetch saved content" });
  }
});

module.exports = router;
