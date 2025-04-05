const express = require('express');
const multer = require('../config/multerConfig'); // Import multer configuration
const videoController = require('../controllers/videoController');
const articleController = require('../controllers/articleController');
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
router.get('/videos/educators', protect, videoController.getVideosByLoggedInEducator);
router.get('/videos/:id', videoController.getVideoById);
router.get('/videos', videoController.getAllVideos);
router.put('/videos/:id', protect, videoController.updateVideo);
router.delete('/videos/:id', protect, videoController.deleteVideo);
router.get("/videos/educator/:educatorId", videoController.getVideosByEducatorId);
router.post('/videos/like/:id', videoController.likeVideo);
router.post('/videos/save/:id',protect, videoController.saveVideo);
//articles
router.post(
    '/upload_article',
    protect,
    multer.fields([{ name: 'articlephoto', maxCount: 2 }]), // Handle image uploads
    articleController.uploadArticle
);

router.get('/articles/educators', protect, articleController.getArticlesByLoggedInEducator);
router.get('/articles/:id', articleController.getArticleById);
router.get('/articles', articleController.getAllArticles);
router.put('/articles/:id', protect, articleController.updateArticle);
router.delete('/articles/:id', protect, articleController.deleteArticle);
router.get("/articles/educator/:educatorId", articleController.getArticlesByEducatorId);

module.exports = router;
