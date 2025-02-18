const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos', // Cloudinary folder name
    resource_type: 'video', // Specifies it's a video upload
    allowed_formats: ['mp4', 'avi', 'mkv', 'mov'] // Allowed video formats
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
