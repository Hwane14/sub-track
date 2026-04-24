/**
 * Input Validation Utilities
 * Provides simpler helper functions for validating user input
 * before it reaches the controller or database layer.
 */

module.exports = {

    // Validate email format using a basic regular expression
    // Ensures a the email contains characters before and after the '@'
    // and includes a valid domain structure
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Validate password strength.
    // Simple rule: at least 8 characters
    validatePassword(password) {
        return password.length >= 8;
    }
};