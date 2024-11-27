const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createBookController, updateBookController } = require('../controllers/bookController');


const router = express.Router();



router.post('/create', authMiddleware, createBookController)
router.put('/update', authMiddleware, updateBookController)




module.exports = router;







