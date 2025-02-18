const express = require('express');
const Content = require('../models/Content'); // Import Content model
const upload = require('../config/multerConfig'); // Import Multer config

const router = express.Router();

// Upload Video Route
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { title, description, creator, category, is_premium } = req.body;

    // Get video URL from Cloudinary
    const videoUrl = req.file.path;

    // Save video details to MongoDB
    const newContent = new Content({
      content_type: 'video',
      title,
      description,
      creator,
      category,
      access_type: is_premium === 'true' ? 'premium' : 'standard',
      video_url: videoUrl,
    });

    await newContent.save();

    res.status(201).json({ message: 'Video uploaded successfully', data: newContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

module.exports = router;
