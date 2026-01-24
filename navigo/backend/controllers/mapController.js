const axios = require('axios');

exports.getCoordinates = async (req, res) => {
  try {
    const { address } = req.query;
    
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    
    if (response.data.results.length === 0) {
      return res.status(404).json({ message: 'Coordinates not found' });
    }
    
    const location = response.data.results[0].geometry.location;
    
    res.json({
      ltd: location.lat,
      lng: location.lng
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDistanceTime = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    
    if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
      return res.status(404).json({ message: 'No routes found' });
    }
    
    const element = response.data.rows[0].elements[0];
    
    res.json({
      distance: element.distance,
      duration: element.duration
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const { input } = req.query;
    
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    
    const suggestions = response.data.predictions.map(pred => pred.description);
    
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch suggestions' });
  }
};
