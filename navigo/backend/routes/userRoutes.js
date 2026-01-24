const express = require('express');
const router = express.Router();
const { register, login, getProfile, logout } = require('../controllers/userController');
const { authUser } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authUser, getProfile);
router.get('/logout', authUser, logout);

module.exports = router;
