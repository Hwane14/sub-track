CREATE DATABASE IF NOT EXISTS subtrack;
USE subtrack;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NULL,
    name VARCHAR(255) NOT NULL,
    cost DECIMAL (10, 2) NOT NULL,
    renewal_date DATE NOT NULL,
    billing_cycle ENUM('monthly', 'yearly') NOT NULL DEFAULT 'monthly',
    status ENUM('essential', 'optional', 'unused') NOT NULL DEFAULT 'optional',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE CASCADE
);

-- Create application user
-- Anyone running this project may keep the password ('CannotGuessThis')
-- as is, or change it and update their .env file accordingly.
CREATE USER IF NOT EXISTS 'subtrack_app'@'localhost'
IDENTIFIED BY 'CannotGuessThis';

GRANT ALL PRIVILEGES ON subtrack.* TO 'subtrack_app'@'localhost';