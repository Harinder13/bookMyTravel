const express = require('express');
const { registerController, loginController } = require('../controllers/authController');
const validateUser = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/register', validateUser, registerController)

router.post('/login', validateUser, loginController)





module.exports = router;