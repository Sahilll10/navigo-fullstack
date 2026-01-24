const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Captain = require('../models/Captain');

exports.authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.authCaptain = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded.id).select('-password');
    
    if (!captain) {
      return res.status(401).json({ message: 'Captain not found' });
    }

    req.captain = captain;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
