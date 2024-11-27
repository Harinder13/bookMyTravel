const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { regAdminController, loginAdminController, getAdminController, updateAdminController } = require('../controllers/adminController');


const router = express.Router();


router.post('/register', regAdminController)

router.post('/login', loginAdminController)

router.get('/getadmin', authMiddleware, getAdminController)

router.put('/upadmin', authMiddleware, updateAdminController)



module.exports = router;