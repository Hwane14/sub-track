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
    }
};