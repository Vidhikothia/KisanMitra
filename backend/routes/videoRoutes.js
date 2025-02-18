const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const Video = require('../models/Video'); // Import Video schema

// Video Upload API
router.post('/upload-video', upload.single('video'), async (req, res) => {
  try {
    const { content_id } = req.body;
    const videoUrl = req.file.path; // Cloudinary URL of the uploaded video

    // Save video details in MongoDB
    const newVideo = new Video({
      content_id,
      video_url: videoUrl
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Video upload failed' });
  }
});

module.exports = router;
