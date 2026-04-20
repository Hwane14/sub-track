// Import MySQL2 with Promise support for async/await queries
const mysql = require('mysql2/promise')
require('dotenv').config();

/**
 * Create a MySQL connection pool
 * Allows multiple queries to run efficiently without
 * opening and closing new connection each time
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true, // Keeps DATE fields as 'YYYY-MM-DD' strings
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool for use in backend
module.exports = pool;