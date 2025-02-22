const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// ✅ Corrected import statement
const cloudinary = require('..config/cloudinaryConfig');

// 🎯 Combined storage configuration for photos and videos
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (file.fieldname === 'photo') {
      return {
        folder: 'educatorPhotos',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
      };
    } else if (file.fieldname === 'video') {
      return {
        folder: 'videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'avi', 'mkv', 'mov']
      };
    } else {
      throw new Error('Invalid file field name');
    }
  }
});

// ✅ Multer upload handler for both photos and videos
const upload = multer({ storage: storage });

module.exports = upload;
