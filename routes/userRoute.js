const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getUserController, registerUserController } = require('../controllers/userController');
const { sendMail } = require('../helpers/sendMail');


const router = express.Router();



router.get('/getuser', authMiddleware, getUserController)

router.post('/reg', registerUserController, sendMail)

module.exports = router;