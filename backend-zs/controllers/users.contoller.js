var User = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');


exports.getUsers = function (req, res) {
    User.find()
    .then(users => { res.json(users) })
    .catch(error => res.json({ error: error.message }));
};

exports.login = function (req, res, next) {
    passport.authenticate('login',function(err, user, info) {
        try {
            if (err) { return next(err); }
            console.log(user);
            if (!user) { return res.json({ message: 'wrong password' }) }
            req.login(user, { session: false }, async (error) => {
                if ( error ) return next(error);
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'secret');
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    }) (req, res, next);
};

exports.signup = function (req, resp, next) {
    passport.authenticate('signup',{ session: false }, function(err, user) {
        console.log('r ', user);
        return resp.json({
            message: 'Signup successful',
            user: user
        });
    }) (req, resp, next);
};
