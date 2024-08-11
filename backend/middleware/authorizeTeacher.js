export const authorizeTeacher = (req, res, next) => {
    if (req.user.role !== 'Teacher') {
        return res.status(403).send('Access denied');
    }
    next();
};
