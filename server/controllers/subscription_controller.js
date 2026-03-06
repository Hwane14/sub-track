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
        const { name, cost, renewal_date } = req.body;

        // Basic validation for required fields
        if (!name || !cost || !renewal_date) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            // Send SQL request via model and store ID of inserted subscription
            const subscriptionId = await subscriptionModel.createSubscription(userId, {
                name,
                cost,
                renewal_date
                // May add the following at a later stage
                // billing_cycle,
                // category_id,
                // status
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
    }
};