let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {

        if(err)
        {
            return next(err);
        }

        if(!user)
        {
            req.flash('logingMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {

            if(err)
            {
                return next(err);
            }
            return res.redirect('/survey')
        });
    })(req, res, next);
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}