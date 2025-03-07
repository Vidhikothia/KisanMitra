const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

// Cloudinary storage configuration for videos and thumbnails
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (file.fieldname === 'photo') {
      // Handling image uploads (educator profile, thumbnails, etc.)
      return {
        folder: 'educatorPhotos',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
      };
    } else if (file.fieldname === 'video') {
      // Handling video file uploads
      return {
        folder: 'videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'avi', 'mkv', 'mov']
      };
    } else if (file.fieldname === 'thumbnail') {
      // Handling video thumbnail uploads
      return {
        folder: 'thumbnails',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 300, height: 200, crop: 'limit' }]
      };
    } else {
      throw new Error('Invalid file field name');
    }
  }
});

// Multer middleware for handling multiple file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // Max file size 50MB
});

module.exports = upload;
