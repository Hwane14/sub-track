// Load core modules
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config()

// Create the Express application
const app = express();

// Enable JSON request parsing
app.use(express.json());

// Allow requests from the React frontend (running on port 3000)
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

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

// Import authentication routes (register, login)
const authRoutes = require('./routes/auth_routes');

// Attach authentication routes to the Express app
// Any route defined in auth_routes.js will now be accessible under the auth prefix
// Example: router.post('/register') becomes POST /auth/register
// This is how user input from the frontend reaches the register/login controller functions
app.use('/auth', authRoutes)

// Confirm API server is running and reachable
app.get('/', (req, res) => {
    res.json({message: "API running"});
});

/** Test DB route:
 * Runs a simple SQL query to confirm:
 * - the databse connection works
 * - environment variables are correct
 * - MySQL is reachable
 */
app.get('/db-test', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ success: true, result: rows[0].result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 8000;
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))