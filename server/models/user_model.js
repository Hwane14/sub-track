/**
 * User Model
 * Handles all database queries related to users.
 * Keeps SQL logic separate from controllers for cleaner structure.
 */
const db = require('../config/db');

module.exports = {
    
    // Look up user by email.
    // Returns full user record (user_id, email, password_hash, created_at)
    // or undefined if no matching user exists
    findByEmail: async (email) => {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );
        return rows[0]; // First (and only) matching row, or undefined
    },

    // Create a new user in the database.
    // Stores the email and hashed password, then returns the new user's ID
    createUser: async (email, passwordHash) => {
        const [result] = await db.query(
            'INSERT INTO users (email, password_hash) VALUES (?, ?)',
            [email, passwordHash]
        );
        return result.insertId; // Primary key for users table (user_id)
    }
};