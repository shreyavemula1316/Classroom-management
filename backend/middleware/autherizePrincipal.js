// Import User model if needed
import User from '../models/User.js';

export const authorizePrincipal = async (req, res, next) => {
    try {
        const user = req.user; // This assumes `authenticateToken` middleware adds `user` to `req`
        
        if (!user || user.role !== 'Principal') {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
