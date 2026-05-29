const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const captainRoutes = require('./routes/captainRoutes');
const rideRoutes = require('./routes/rideRoutes');
const mapRoutes = require('./routes/mapRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- NEW STRICT MONGODB CONNECTION CODE ---
// 1. Force Mongoose to throw real errors instantly instead of buffering
mongoose.set('bufferCommands', false);

// 2. Connect with strict timeout rules to catch hangs
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.log('MongoDB Initial Error:', err));

// 3. Track if the connection drops in the background
mongoose.connection.on('error', err => {
  console.error('MongoDB Background Runtime Error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB mysteriously disconnected!');
});
// ------------------------------------------

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/rides', rideRoutes);
app.use('/maps', mapRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'NaviGo API is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});