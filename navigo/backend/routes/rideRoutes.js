const express = require('express');
const router = express.Router();
const { createRide, getFare } = require('../controllers/rideController');
const { authUser } = require('../middleware/auth');

router.post('/create', authUser, createRide);
router.get('/get-fare', authUser, getFare);

module.exports = router;
