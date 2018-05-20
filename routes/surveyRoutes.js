const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');


module.exports = app => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });

        res.send(surveys);
    })

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!')
    })

    app.post('/api/surveys/webhooks', (req ,res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        
         _.chain(req.body).map( ({ email, url }) => {

           //pulls surveyID and choice from url. If p cannot extract surveyID or choice the match will be null.
            const match = p.test(new URL(url).pathname);

           if(match) {
               return { email: email, surveyId: match.surveyId, choice: match.choice };
           }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({surveyId, email, choice}) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false }
                }
            },
            //update criteria
            {
                $inc: {[choice]: 1},
                $set: {'recipients.$.responded': true },
                lastResponded:  new Date()
            }).exec();
        })
        .value();

        
        res.send({});
    })

    //creates instance of a survey in memory not saved to DB yet.
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients} = req.body;

        //es6 syntax if property name and value are same then you write only one.
        const survey = new Survey({
            title, 
            subject, 
            body, 
            recipients: recipients.split(',').map(email => { return { email: email.trim() }}),
            _user: req.user.id, //**id generated automatically by mongoose for the model.**
            dateSent: Date.now(),
        })
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try{
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            //catch this inside authReducer and updates header
            res.send(user);
        }
        catch (err){
            res.status(422).send(err);
        }
        
    });
};


