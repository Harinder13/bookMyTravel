const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createTravelController, updateTravelController, deleteTravelController } = require('../controllers/travelController');
const multer = require('multer')
const upload = require('../config/multerConfig')

const router = express.Router();



router.post('/upload-images', upload.array('images', 2), async (req, res) => {
    try {
        const uploadedImages = req.files.map(file => file.path); // Cloudinary image URLs
        res.status(200).json({
            success: true,
            message: 'Images uploaded successfully',
            data: uploadedImages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload images',
            error: error.message,
        });
    }
});

router.post('/create', authMiddleware, createTravelController)

router.put('/update', authMiddleware, updateTravelController)
router.delete('/del/:id', authMiddleware, deleteTravelController)



module.exports = router;

