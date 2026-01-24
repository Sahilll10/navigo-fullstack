const express = require('express');
const router = express.Router();
const { getCoordinates, getDistanceTime, getSuggestions } = require('../controllers/mapController');

router.get('/get-coordinates', getCoordinates);
router.get('/get-distance-time', getDistanceTime);
router.get('/get-suggestions', getSuggestions);

module.exports = router;
