module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!'});
    }
    // everything looks good move onto request handler or more middleware that is in line.
    next();
};