# NaviGo - Ride Hailing Platform

A complete ride-hailing application similar to Uber/Ola with user and captain (driver) functionality.

## Features

- User registration and authentication
- Captain (driver) registration with vehicle details
- Real-time ride booking
- Fare calculation based on distance
- Google Maps integration for location services
- OTP-based ride verification

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Google Maps API

**Frontend:**
- React.js
- Material-UI
- Axios
- React Router

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/navigo
JWT_SECRET=your_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

4. Start MongoDB:
```bash
mongod
```

5. Run the server:
```bash
npm start
```

Server runs on http://localhost:3000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend runs on http://localhost:3001

## API Endpoints

### User Routes
- POST `/users/register` - Register new user
- POST `/users/login` - Login user
- GET `/users/profile` - Get user profile (Protected)
- GET `/users/logout` - Logout user (Protected)

### Captain Routes
- POST `/captains/register` - Register new captain
- POST `/captains/login` - Login captain
- GET `/captains/profile` - Get captain profile (Protected)
- GET `/captains/logout` - Logout captain (Protected)

### Ride Routes
- POST `/rides/create` - Create new ride (Protected)
- GET `/rides/get-fare` - Get fare estimate (Protected)

### Map Routes
- GET `/maps/get-coordinates` - Get coordinates for address
- GET `/maps/get-distance-time` - Get distance and time between locations
- GET `/maps/get-suggestions` - Get autocomplete suggestions

## Project Structure

```
navigo/
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── captainController.js
│   │   ├── rideController.js
│   │   └── mapController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Captain.js
│   │   └── Ride.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── captainRoutes.js
│   │   ├── rideRoutes.js
│   │   └── mapRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
    └── package.json
```

## How to Use

1. **As a User:**
   - Register/Login
   - Enter pickup and destination
   - See fare estimates for different vehicle types
   - Book a ride
   - Track ride status

2. **As a Captain:**
   - Register with vehicle details
   - Login
   - Accept ride requests
   - Complete rides using OTP verification

## Notes

- Make sure MongoDB is running before starting the backend
- Get a Google Maps API key from Google Cloud Console
- Update the `.env` file with your actual credentials
