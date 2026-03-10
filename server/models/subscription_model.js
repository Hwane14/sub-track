// Handles database operations for subscriptions
// Each function corresponds to a specific CRUD action

const db = require('../config/db');

module.exports = {
    /**
     * Inserts a new subscription for a specific user.
     * Expects validated input from the controller.
     */
    createSubscription: async (userId, data) => {
        const sql = `
            INSERT INTO subscriptions
            (user_id, category_id, name, cost, renewal_date)
            VALUES (?, ?, ?, ?, ?)
            `;

        const params = [
            userId,
            data.category_id || null, // nullable
            data.name,
            data.cost,
            data.renewal_date
        ];

        const [result] = await db.query(sql, params);
        return result.insertId;
    },

    /**
     * Returns all subscriptions belonging to a specific user.
     */
    getSubscriptionsByUser: async (userId) => {
        const sql = `
            SELECT * FROM subscriptions WHERE user_id = ?
            ORDER BY created_at DESC
            `;

        const [rows] = await db.query(sql, [userId]);
        return rows;
    },

    /**
     * Updates a subscription belonging to a specific user.
     * Only updates fields provided in the data object.
     */
    updateSubscription: async (subscriptionId, userId, data) => {
        const fields = [];
        const params = [];

        // Build dynamic SQL based on provided fields
        if (data.name) {
            fields.push("name = ?");
            params.push(data.name);
        }

        if (data.cost) {
            fields.push("cost = ?");
            params.push(data.cost);
        }

        if (data.renewal_date) {
            fields.push("renewal_date = ?");
            params.push(data.renewal_date);
        }

        // If no fields provided, do nothing
        if (fields.length === 0) return false;

        const sql = `
            UPDATE subscriptions
            SET ${fields.join(", ")}
            WHERE subscription_id = ? and user_id = ?
            `;

        params.push(subscriptionId, userId);

        const [result] = await db.query(sql, params);
        return result.affectedRows > 0;
    }
};