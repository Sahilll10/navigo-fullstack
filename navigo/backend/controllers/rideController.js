const Ride = require('../models/Ride');
const axios = require('axios');

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const calculateFare = (distance, vehicleType) => {
  const baseFares = {
    auto: 30,
    moto: 20,
    car: 50
  };
  
  const perKmRates = {
    auto: 10,
    moto: 8,
    car: 15
  };

  const distanceInKm = distance / 1000;
  return baseFares[vehicleType] + (perKmRates[vehicleType] * distanceInKm);
};

exports.createRide = async (req, res) => {
  try {
    const { pickup, destination, vehicleType } = req.body;
    
    const distanceResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pickup}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    
    const distance = distanceResponse.data.rows[0].elements[0].distance.value;
    const duration = distanceResponse.data.rows[0].elements[0].duration.value;
    const fare = calculateFare(distance, vehicleType);
    
    const ride = await Ride.create({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
      fare: Math.round(fare),
      distance,
      duration,
      otp: generateOTP()
    });

    res.status(201).json({ ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFare = async (req, res) => {
  try {
    const { pickup, destination } = req.query;
    
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pickup}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    
    const distance = response.data.rows[0].elements[0].distance.value;
    
    const fares = {
      auto: Math.round(calculateFare(distance, 'auto')),
      moto: Math.round(calculateFare(distance, 'moto')),
      car: Math.round(calculateFare(distance, 'car'))
    };

    res.json(fares);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
