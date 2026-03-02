/**
 * Authentication Routes
 * Defined URL endpoints for user registration and login.
 * Each route forwards the incoming request to the appropriate
 * controller function that contains the logic
 */ 

const express = require('express');
const router = express.Router();

// Load the authentication controller
// This controller contains the functions that handle register() and login().
const authController = require('../controllers/auth_controllers');

// POST /auth/register
// Handles user registration requests
// The request body (email + password) is passed to authController.register
router.post('/register', authController.register);

// POST /auth/login
// Handles user login requests
// The request body is passed to authController.login for verification.
router.post('/login', authController.login);

// Export the router so it can be mounted in index.js under the /auth prefix
module.exports = router;