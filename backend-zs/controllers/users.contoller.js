const UserModel = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
//const jwtDecode = require(jwt-decode);
const sgMail = require('@sendgrid/mail');

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
                const authToken = await jwt.sign({ user: body }, process.env.JWT_SECRET);
                return res.json({ authToken });
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
        const activationLink = 'localhost:3001/api/signup/verify' + user.verificationToken;
        const msg = {
            to: user.email,
            from: 'info@zukunftschreiben.de',
            subject: '',
            text: 'Activate your account by clicking on the following link: ' + activationLink,
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        // sgMail.send(msg).then();
        return res.json({
            message: 'Signup successful',
            user: user
        });
    }) (req, res, next);
};

exports.verify = async function(req, res) {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.JWT_SECRET);
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

exports.verifyToken = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  };
  

exports.updateUser = function (req, res, next) {
   

        User.findById(req.userId, { password: 0 }, function (err, user) {
          if (err) return res.status(500).send("There was a problem finding the user.");
          if (!user) return res.status(404).send("No user found.");
          
          res.status(200).send(user);
        });
        
      };

