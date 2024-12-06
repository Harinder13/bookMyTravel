const multer = require('multer');

const cloudinary = require('./cloudinaryConfig');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload'); // Specify your desired upload directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5 MB per file
});

module.exports = upload; 