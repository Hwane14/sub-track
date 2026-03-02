// Contains logic for handling user registration and login.
// This layer receives validated input from the routes, interacts with the
// user model for database operations, and returns appropriate HTTP responses

const bcrypt = require('bcrypt');
// Import the user model (database queries for users)
const userModel = require('../models/user_model');
// Import validation helpers for email + password format checks
const { validateEmail, validatePassword } = require('../utils/validate');

module.exports = {
    /**
     * Register Controller
     * Handles user sign-up. Steps:
     * 1. Extract email + password from request body
     * 2. Validate input format
     * 3. Check if the email already exists in the database
     * 4. Hash the password using bcrypt
     * 5. Store the new user in the database
     * 6. Return the new user's ID
     */
    register: async (req, res) => {
        const { email, password } = req.body;

        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Validate password length (basic rule: at least 8 characters)
        if (!validatePassword(password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters" });
        }

        // Check if a user with this email already exists
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" });
        }

        // Hash the password before storing
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert new user into the database and get their user_id
        const userId = await userModel.createUser(email, passwordHash);

        // Respond with success and the new user's ID
        res.status(201).json({ success: true, userId });
    },

    /**
     * Login Controller
     * Handles user login. Steps:
     * 1. Extract email + password from request body
     * 2. Look up the user by email
     * 3. Compare the provided password with the stored hashed password
     * 4. Return success if they match, otherwise return an error
     */
    login: async (req, res) => {
        const { email, password } = req.body;

        // Look up the user by email
        const user = await userModel.findByEmail(email);
        
        // If no user exists with this email, login fails
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare plain password with the stored hashed password
        const match = await bcrypt.compare(password, user.password_hash);

        // If the password does not match, login fails
        if (!match) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Login successful
        res.json({ success: true, message: "Login successful" });
    }
};