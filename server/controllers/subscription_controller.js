// Contains logic for creating a new subscription.
// Receives validated input from the route and interacts with the model.

const subscriptionModel = require('../models/subscription_model');

module.exports = {
    /**
     * Create subscription controller
     * Steps:
     * 1. Extract fields from request body
     * 2. Validate required fields
     * 3. Use session userId to associate subscriptions with the logged-in user
     * 4. Insert into database via the model
     * 5. Return the new subscription ID
     */
    create: async (req, res) => {
        // Extract userId
        const userId = req.session.userId;

        // Extract subscription details
        let { name, cost, renewal_date, category, status } = req.body;

        // Basic validation for required fields
        if (!name || !cost || !renewal_date || !category) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            // Send SQL request via model and store ID of inserted subscription
            const subscriptionId = await subscriptionModel.createSubscription(userId, {
                name,
                cost,
                renewal_date,
                category,
                status
            });

            res.status(201).json({ success: true, subscriptionId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create subscription" });
        }
    },

    /**
     * Get all subscriptions for the logged-in user.
     * Steps:
     * 1. Read userId from the session
     * 2. Fetch all subscriptions belonging to that user
     * 3. Return them as JSON
     */
    getAll: async (req, res) => {
        const userId = req.session.userId;

        try {
            const subscriptions = await subscriptionModel.getSubscriptionsByUser(userId);
            
            res.json({ success: true, subscriptions });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch subscriptions" });
        }
    },

    /**
     * Update a subscription for the logged-in user.
     * Steps:
     * 1. Extract subscription ID from URL params
     * 2. Extract userId from session
     * 3. Extract fields from request body
     * 4. Pass only provided fields to the model
     * 5. Return success or failure
     */
    update: async (req, res) => {
        const subscriptionId = req.params.id;
        const userId = req.session.userId;

        const { name, cost, renewal_date, category, status } = req.body;

        try {
            const updated = await subscriptionModel.updateSubscription(
                subscriptionId,
                userId,
                { name, cost, renewal_date, category, status }
            );

            if (!updated) {
                return res.status(404).json({ error: "Subscription not found or no changes applied" });
            }

            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to updated subscription" });
        }
    },

    /**
     * Delete a subscription for the logged-in user.
     * Steps:
     * 1. Extract subscription ID from URL params
     * 2. Use session userId to ensure ownership
     * 3. Attempt deletion via model
     * 4. Return success or failure
     */
    delete: async (req, res) => {
        const subscriptionId = req.params.id;
        const userId = req.session.userId;

        try {
            const deleted = await subscriptionModel.deleteSubscription(subscriptionId, userId);

            if (!deleted) {
                return res.status(404).json({ error: "Subscription not found or not owned by user" });
            }

            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to delete subscription" });
        }
    }
};