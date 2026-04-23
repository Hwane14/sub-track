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
            (user_id, name, cost, renewal_date, category, status)
            VALUES (?, ?, ?, ?, ?, ?)
            `;

        const params = [
            userId,
            data.name,
            data.cost,
            data.renewal_date,
            data.category,
            data.status
        ];

        const [result] = await db.query(sql, params);
        return result.insertId;
    },

    /**
     * Returns all subscriptions stored in the subscriptions table.
     */
    getAllSubscriptions: async () => {
        const sql = `SELECT * FROM subscriptions`;
        const [rows] = await db.query(sql);
        return rows;
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
        
        if (data.category) {
            fields.push("category = ?");
            params.push(data.category);
        }
        if (data.status) {
            fields.push("status = ?");
            params.push(data.status);
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
    },

    /**
     * Updates the renewal date for a particular subscription
     */
    updateSubscriptionDate: async (subscriptionId, newDate) => {
        const sql = `
            UPDATE subscriptions
            SET renewal_date = ?
            WHERE subscription_id = ?
            `;
        const [result] = await db.query(sql, [newDate, subscriptionId]);
        return result.affectedRows > 0;
    },

    /**
     * Deletes a subscription if it belongs to the given user.
     */
    deleteSubscription: async (subscriptionId, userId) => {
        const sql = `
            DELETE FROM subscriptions
            WHERE subscription_id = ? AND user_id = ?
            `;
        
        const [result] = await db.query(sql, [subscriptionId, userId]);
        return result.affectedRows > 0;
    }
};