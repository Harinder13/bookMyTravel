const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getUserController } = require('../controllers/userController');


const router = express.Router();



router.get('/getuser', authMiddleware, getUserController)


module.exports = router;