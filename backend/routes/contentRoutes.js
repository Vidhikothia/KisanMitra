const express = require('express');
const multer = require('../config/multerConfig'); // Import multer configuration
const videoController = require('../controllers/videoController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Route for uploading video along with thumbnail
router.post(
    '/upload_video',
    protect, // Check for valid JWT token
    multer.fields([
        { name: 'video', maxCount: 1 },     // Handle video file upload
        { name: 'thumbnail', maxCount: 1 }  // Handle thumbnail image upload
    ]),
    videoController.uploadVideo
);
router.get('/videos/:id', videoController.getVideoById);
router.get('/videos', videoController.getAllVideos);
router.put('/videos/:id', protect, videoController.updateVideo);
router.delete('/videos/:id', protect, videoController.deleteVideo);

module.exports = router;
