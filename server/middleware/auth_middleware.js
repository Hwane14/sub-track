/**
 * Authentication middleware
 * Protects routes that require a logged-in user.
 * Checks whether the session contains a valid userId.
 */
module.exports.requireLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Authentication required" });
    }
    next();
};