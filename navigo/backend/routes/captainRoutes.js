const express = require('express');
const router = express.Router();
const { register, login, getProfile, logout } = require('../controllers/captainController');
const { authCaptain } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authCaptain, getProfile);
router.get('/logout', authCaptain, logout);

module.exports = router;
