module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'You dont have enough credits'});
    }
    // everything looks good move onto request handler or more middleware that is in line.
    next();
};