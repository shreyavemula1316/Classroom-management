export const authorizeStudent = (req, res, next) => {
    if (req.user.role !== 'Student') {
        return res.status(403).send('Access denied');
    }
    next();
};
