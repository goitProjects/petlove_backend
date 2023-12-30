const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {

    return {
      folder: 'pets',
      allowed_formats: ['webp'],
      public_id: file.originalname,
        transformation: [
        { crop: 'scale'  }
      ],
    };
  },
});

const upload = multer({ storage,  limits: {
  fileSize: 5 * 1024 * 1024,
} });

module.exports = upload;
