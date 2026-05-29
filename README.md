# 🚗 NaviGo - Your Personal Ride-Hailing Platform

> Hey there! Welcome to NaviGo - a ride-hailing app that's like Uber or Ola, but built by you! This guide will walk you through everything, even if you're completely new to coding. Don't worry, we've got your back! 😊

## 🎯 What is NaviGo?

NaviGo is a complete ride-hailing application where:
- **Users** can book rides by entering pickup and destination locations
- **Captains** (drivers) can register with their vehicle details and accept rides
- The app calculates fares based on distance
- Everything is secure with password protection and authentication

Think of it as your own mini Uber! 🎉

# NaviGO

NaviGO is an end-to-end full-stack rental and booking platform engineered for real-time route calculation and seamless user-captain matching. 

### Live Deployments
* **Frontend Application (Vercel):** [https://navigo-one.vercel.app](https://navigo-one.vercel.app)
* **Backend API (Render):** [https://navigo-gxby.onrender.com](https://navigo-gxby.onrender.com)

---

### System Architecture

The following diagram illustrates the strict data flow from client interaction to database storage and external API routing.

```mermaid
graph TD
    %% Professional Black and White Styling
    classDef default fill:#fff,stroke:#000,stroke-width:2px,color:#000,font-family:monospace;
    classDef db fill:#fff,stroke:#000,stroke-width:2px,color:#000,font-family:monospace,shape:cylinder;
    linkStyle default stroke:#000,stroke-width:2px;

    Client[Web Client] -->|HTTPS| FE[React Frontend]
    FE -->|RESTful API| BE[Node.js / Express Backend]
    
    BE -->|TCP / Mongoose| DB[(MongoDB Atlas)]
    BE -->|HTTP GET| OSM[OpenStreetMap API]

    class DB db;

## 📸 What You'll Build

- A beautiful landing page where users can sign up
- User dashboard to book rides (Auto, Moto, or Car)
- Captain dashboard to manage rides and vehicle info
- Secure login system for both users and captains
- Real-time fare calculation

## 🛠️ What You Need (Don't Panic!)

Before we start, you'll need these tools installed on your computer:

### 1. **Node.js** (The brain of our backend)
- **What is it?** Think of it as the engine that runs JavaScript code on your computer
- **How to get it:** Go to [nodejs.org](https://nodejs.org/) and download the LTS version
- **How to check if you have it:** Open PowerShell and type `node --version`
- You should see something like `v20.x.x` or `v18.x.x`

### 2. **MongoDB Atlas** (Where we store data - FREE!)
- **What is it?** A cloud database that stores all your users, rides, and captain information
- **Why cloud?** No installation needed! Everything runs online for free
- **How to get it:** Follow the setup guide below (super easy!)

### 3. **A Code Editor** (To view and edit code)
- We recommend **VS Code** - download from [code.visualstudio.com](https://code.visualstudio.com/)
- It's free, friendly, and makes coding easier!

### 4. **A Web Browser** (You already have this!)
- Chrome, Firefox, or Edge - any modern browser works!

## 📥 Installation Guide (Step-by-Step)

Let's get NaviGo running on your computer! Take it slow, follow each step, and you'll be fine.

### Step 1: Download NaviGo

1. Download the `navigo-fullstack.zip` file
2. Right-click on it and select **"Extract All..."**
3. Extract to a location you'll remember (like `C:\Users\YourName\`)
4. You'll now have a folder called `navigo`

### Step 2: Set Up MongoDB Atlas (Our Free Cloud Database)

Don't worry - this sounds complicated but it's actually super simple!

#### 2.1 Create a Free Account
1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email (it's completely FREE!)
3. Verify your email

#### 2.2 Create Your First Database
1. Click **"Build a Database"**
2. Choose the **FREE** option (M0 - it says "FREE FOREVER")
3. Choose a cloud provider and region closest to you
4. Name your cluster (or keep the default name)
5. Click **"Create"** and wait 2-3 minutes while it sets up

#### 2.3 Create a Database User
1. You'll see a popup asking to create a user
2. Username: Choose something simple (like your name)
3. Password: Create a strong password and **SAVE IT SOMEWHERE!** You'll need this
4. Click **"Create User"**

#### 2.4 Allow Access from Anywhere
1. Scroll down to "Where would you like to connect from?"
2. Click **"Add My Current IP Address"** first
3. Then click **"Add a Different IP Address"**
4. Enter `0.0.0.0/0` (this allows access from anywhere)
5. Click **"Add Entry"**
6. Click **"Finish and Close"**

#### 2.5 Get Your Connection String
1. Click **"Connect"** on your cluster
2. Choose **"Drivers"**
3. Select **"Node.js"** as driver and version **"6.7 or later"**
4. Copy the connection string that looks like:
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/
   ```
5. **IMPORTANT:** Replace `<password>` with your actual password
6. Add `/navigo` at the end before the `?`

Your final string should look like:
```
mongodb+srv://yourname:yourpassword@cluster0.xxxxx.mongodb.net/navigo?retryWrites=true&w=majority
```

### Step 3: Set Up the Backend (Server Side)

The backend is the behind-the-scenes magic that handles logins, bookings, etc.

#### 3.1 Open PowerShell
- Press `Windows Key + X`
- Click **"Windows PowerShell"** or **"Terminal"**

#### 3.2 Navigate to Backend Folder
```powershell
cd "C:\Users\YourName\navigo\backend"
```
Replace `YourName` with your actual Windows username.

#### 3.3 Install Dependencies
```powershell
npm install
```
This will download all the tools our app needs. It might take 2-3 minutes. ☕

#### 3.4 Configure Your Environment
1. Open the backend folder in File Explorer
2. Find the file named `.env`
3. Right-click → Open with **Notepad**
4. You'll see:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/navigo
   JWT_SECRET=your_secret_key_change_in_production
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

5. Replace the `MONGO_URI` line with your MongoDB Atlas connection string from Step 2.5:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://yourname:yourpassword@cluster0.xxxxx.mongodb.net/navigo?retryWrites=true&w=majority
   JWT_SECRET=navigo_secret_2026
   GOOGLE_MAPS_API_KEY=AIzaSyDummy_Key_For_Testing
   ```

6. **Save the file** (Ctrl + S)

#### 3.5 Start the Backend
```powershell
npm start
```

You should see:
```
Server running on port 3000
MongoDB Connected
```

🎉 **Congratulations!** Your backend is running! Leave this window open.

### Step 4: Set Up the Frontend (What Users See)

The frontend is the beautiful interface users interact with.

#### 4.1 Open a New PowerShell Window
- Press `Windows Key + X` again
- Click **"Windows PowerShell"** or **"Terminal"**
- Don't close the first one!

#### 4.2 Navigate to Frontend Folder
```powershell
cd "C:\Users\YourName\navigo\frontend"
```

#### 4.3 Install Dependencies
```powershell
npm install
```
Again, this will take a couple of minutes.

#### 4.4 Start the Frontend
```powershell
npm start
```

Your browser will automatically open to `http://localhost:3001`! 🚀

If it doesn't open automatically, just type that URL into your browser.

## 🎮 How to Use NaviGo

### For Users (People Who Need Rides)

1. **Sign Up:**
   - Click **"Get a Ride"** on the homepage
   - Fill in your details (first name, last name, email, password)
   - Click **"Sign Up"**

2. **Book a Ride:**
   - Enter your **pickup location** (e.g., "Times Square, New York")
   - Enter your **destination** (e.g., "Central Park, New York")
   - Click **"Get Fare Estimates"**
   - Choose between Auto 🛺, Moto 🏍️, or Car 🚗
   - Click on your choice to book!
   - You'll get an OTP (One-Time Password) for your ride

### For Captains (Drivers)

1. **Sign Up:**
   - Click **"Become a Captain"** on the homepage
   - Fill in your details AND vehicle information:
     - Vehicle color (e.g., "Black")
     - Plate number (e.g., "ABC123")
     - Capacity (e.g., "4" for 4 seats)
     - Vehicle type (Car, Motorcycle, or Auto)
   - Click **"Sign Up as Captain"**

2. **View Dashboard:**
   - See your vehicle details
   - Wait for ride requests (coming soon!)
   - Track your earnings

## 🆘 Troubleshooting (When Things Go Wrong)

Don't panic! Here are solutions to common issues:

### Problem: "npm is not recognized"
**Solution:** You need to install Node.js
- Go to [nodejs.org](https://nodejs.org/)
- Download and install the LTS version
- Restart PowerShell and try again

### Problem: "MongoDB connection failed"
**Solution:** Check your connection string
1. Make sure you replaced `<password>` with your actual password
2. If your password has special characters like `@`, `#`, `$`, you need to encode them:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` becomes `%24`
3. Make sure you added `/navigo` before the `?`
4. Check if you whitelisted `0.0.0.0/0` in MongoDB Atlas Network Access

### Problem: "Port 3000 already in use"
**Solution:** Another program is using that port
- Close any other apps using port 3000
- Or change the PORT in `.env` to 3001

### Problem: Frontend won't start
**Solution:** 
1. Make sure backend is running first
2. Try deleting `node_modules` folder and run `npm install` again
3. Check if port 3001 is available

### Problem: "CORS Error" in browser
**Solution:** 
- Make sure both backend (port 3000) and frontend (port 3001) are running
- Clear your browser cache (Ctrl + Shift + Delete)

## 🔒 Important Security Notes

Since this is a learning project:

1. **NEVER share your `.env` file** - it contains sensitive passwords
2. **Use strong passwords** when you deploy this publicly
3. **The Google Maps API key** is optional - the app works without it for testing
4. **In production**, change `JWT_SECRET` to something more secure

## 📁 Project Structure (What's What)

```
navigo/
├── backend/                 # Server-side code
│   ├── controllers/         # Business logic (what happens when you book a ride)
│   ├── models/             # Database structure (how we store users, rides)
│   ├── routes/             # URL paths (/users/login, /rides/create, etc.)
│   ├── middleware/         # Security checks (is user logged in?)
│   ├── server.js           # Main backend file (starts everything)
│   └── .env                # Secret configuration (passwords, keys)
│
└── frontend/               # Client-side code (what you see)
    ├── src/
    │   ├── components/     # Reusable UI pieces
    │   ├── pages/          # Different screens (Home, Login, Dashboard)
    │   ├── context/        # Shared data (user info across pages)
    │   └── App.jsx         # Main React component
    └── public/             # Static files (images, HTML)
```

## 🎓 Learning Resources

Want to understand the code better? Check these out:

- **JavaScript Basics:** [javascript.info](https://javascript.info/)
- **React Tutorial:** [react.dev/learn](https://react.dev/learn)
- **Node.js Guide:** [nodejs.dev/learn](https://nodejs.dev/learn)
- **MongoDB Tutorial:** [mongodb.com/docs/manual/tutorial](https://www.mongodb.com/docs/manual/tutorial/)

## 🚀 What's Next?

1. **Add Google Maps Integration:**
   - Get a free API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable "Maps JavaScript API" and "Directions API"
   - Add the key to your `.env` file

2. **Deploy Online:**
   - Deploy backend to [Render.com](https://render.com/) (FREE)
   - Deploy frontend to [Vercel.com](https://vercel.com/) (FREE)
   - Share your app with the world!

3. **Add More Features:**
   - Real-time tracking
   - Ride history
   - Ratings and reviews
   - Payment integration
   - Chat between user and captain


**Remember:** The only way to learn coding is by doing it. Don't be afraid to break things - that's how we learn!

Happy Coding! 🎉
