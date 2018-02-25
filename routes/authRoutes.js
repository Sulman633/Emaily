const passport = require('passport');

module.exports = (app) =>{
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.send(req.user);
    })
    
    // gets user id printed on to screen
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}

