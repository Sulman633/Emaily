const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/key');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

//middlewares
// needed for post requests, so that req object can be read!
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
// adds data model onto request object as a property for use throughout server side.
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//production code when on heroku, express will serve production assets

if (process.env.PORT === 'production') {
    //Express will serve up the index.html
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.NODE_ENV || 5000;
app.listen(PORT);

