const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createTravelController, updateTravelController, deleteTravelController } = require('../controllers/travelController');


const router = express.Router();


router.post('/create', authMiddleware, createTravelController)

router.put('/update', authMiddleware, updateTravelController)
router.delete('/del/:id', authMiddleware, deleteTravelController)



module.exports = router;

