const UserModel = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');


exports.getUsers = function (req, res) {
    UserModel.find()
      .then(users => { res.json(users) })
      .catch(error => res.json({ error: error.message }));
};

exports.login = function (req, res, next) {
    passport.authenticate('login',function(err, user, info) {
        try {
            if (err) { return next(err); }
            if (!user) { return res.status(401).send({ message: 'Incorrect credentials' }) }
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

exports.signup = function (req, res, next) {
    passport.authenticate('signup',{ session: false }, function(err, user, info) {
        if (err) {
            console.log(err);
        }
        return res.json({
            message: 'Signup successful',
            user: user
        });
    }) (req, res, next);
};

exports.verify = async function(req, res) {
    try {
        const token = req.params.token;
        jwt.verify(token, 'secret');
        const user = await UserModel.findOne({verificationToken: req.params.token});
        if (!user) {
            return res.json({ success: false, message: 'User not found for token' })
        }
        user.isAuthenticated = true;
        await user.save();
        await res.json({ success: true, message: 'Successfully verified user'});
    } catch (e) {
        console.log(e);
        await res.json({ success: false, message: e })
    }
};
