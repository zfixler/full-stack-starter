export function auth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        return res.status(403).send('User is not authenticated.')
    }
}
