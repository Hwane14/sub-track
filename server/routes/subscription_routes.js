// Defines routes for subscription operations.
// Each route calls a controller function and uses middleware for protection.

const express = require('express');
const router = express.Router();

const subscriptionController = require('../controllers/subscription_controller');
const requireLogin = require('../middleware/auth_middleware');

// POST /subscripitons
router.post('/', requireLogin, subscriptionController.create);

module.exports = router;