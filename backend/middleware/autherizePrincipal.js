export const authorizePrincipal = (req, res, next) => {
    if (req.user.role !== 'Principal') {
        return res.status(403).send('Access denied. Only principals can perform this action.');
    }
    next();
};
