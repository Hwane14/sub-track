// Defines routes for subscription operations.
// Each route calls a controller function and uses middleware for protection.

const express = require('express');
const router = express.Router();

const subscriptionController = require('../controllers/subscription_controller');
const requireLogin = require('../middleware/auth_middleware');

// POST /subscripitons - Add subscription for logged-in user
router.post('/', requireLogin, subscriptionController.create);
// GET /subscriptions - Get all subscriptions for logged-in user
router.get('/', requireLogin, subscriptionController.getAll);
// PUT /subscriptions/:id - Update a subscription
router.put('/:id', requireLogin, subscriptionController.update);

module.exports = router;