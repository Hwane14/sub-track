// Load core modules
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config()

// Load daily renewal-date cron job
const { startRenewalCron } = require('./cron/renewal_updater');

// Create the Express application
const app = express();

// Enable JSON request parsing
app.use(express.json());

// Allow requests from the React frontend (running on port 5173)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // allow cookies for session-based login
}));

// Import the database connection pool
const db = require('./config/db');

// Create a session for login persistence
// Stores a unique session ID in a cookie and keeps userId on the server
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000 // Session expires after 10 minutes of inactivity
    }
}));

// Import routes
const authRoutes = require('./routes/auth_routes');
const subscriptionRoutes = require('./routes/subscription_routes');

// Attach routes to the Express app
// Any route defined in {type}_routes.js will now be accessible under the specified prefix
// Example: router.post('/register') becomes POST /auth/register
// This is how user input from the frontend reaches the controller functions
app.use('/auth', authRoutes)
app.use('/subscriptions', subscriptionRoutes);

// Start cron job
startRenewalCron();

const PORT = process.env.PORT || 8000;
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))