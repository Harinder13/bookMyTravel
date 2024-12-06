const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv')

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.cloud_Name,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_Secret,
});

// Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'upload', // Cloudinary folder name
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
    },
});

module.exports = { cloudinary, storage };
