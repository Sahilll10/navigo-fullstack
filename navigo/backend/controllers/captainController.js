const Captain = require('../models/Captain');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { fullname, email, password, vehicle } = req.body;

    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const captain = await Captain.create({
      fullname,
      email,
      password,
      vehicle
    });

    const token = generateToken(captain._id);

    res.status(201).json({
      captain: {
        id: captain._id,
        fullname: captain.fullname,
        email: captain.email,
        vehicle: captain.vehicle
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const captain = await Captain.findOne({ email });
    if (!captain) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(captain._id);

    res.json({
      captain: {
        id: captain._id,
        fullname: captain.fullname,
        email: captain.email,
        vehicle: captain.vehicle
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.json({
      captain: {
        id: req.captain._id,
        fullname: req.captain.fullname,
        email: req.captain.email,
        vehicle: req.captain.vehicle
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
