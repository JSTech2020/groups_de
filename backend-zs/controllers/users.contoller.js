const UserModel = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
//const jwtDecode = require(jwt-decode);
const sgMail = require('@sendgrid/mail');

exports.login = function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
        try {
            if (err) { return next(err); }
            if (!user) { return res.status(401).send({ message: 'Incorrect credentials' }) }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                const userObj = user.toObject();
                delete userObj.password;
                const authToken = await createToken(userObj);
                res.json({ authToken });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

exports.signup = function (req, res, next) {
    passport.authenticate('signup', { session: false }, function (err, user, info) {
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
    })(req, res, next);
};

exports.getUsers = function (req, res) {
    UserModel.find()
        .then(users => { res.json(users) })
        .catch(error => res.json({ error: error.message }));
};

exports.updateUser = async function (req, res) {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        const authToken = await createToken(user);
        res.json({ authToken });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getUsers = function (req, res) {
    UserModel.find()
        .then(users => { res.json(users) })
        .catch(error => res.json({ error: error.message }));
};

exports.verify = async function (req, res) {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ verificationToken: req.params.token });
        if (!user) {
            return res.json({ success: false, message: 'User not found for token' })
        }
        user.isAuthenticated = true;
        await user.save();
        await res.json({ success: true, message: 'Successfully verified user' });
    } catch (e) {
        console.log(e);
        await res.json({ success: false, message: e })
    }
};

exports.comparePassword = async function (req, res) {
    try {
        UserModel.findById(req.params.id, async function (err, user) {
            if (err) throw err;
            else {
                const password = req.body.password;
                const validPassword = await user.isValidPassword(password);

                if (validPassword) {

                    res.status(200).json({ success: true, message: 'Correct password' });
                }
                else {
                    res.status(400).json({ success: true, message: 'InCorrect password' });
                }
            }
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.verifyUserIsAdmin = function (req, res, next) {
    UserModel.findOne({ _id: req.user._id })
        .then(user => {
            if (!user)
                return res.status(401).send({ error: { code: 401, message: 'user not found' } })
            else if (!user.admin)
                res.status(403).json({ error: { code: 403, message: 'user is not an admin' } })
            else
                next()
        })
        .catch(error => res.status(500).json({ error: error }));
}

async function createToken(user) {
    return await jwt.sign({ user }, process.env.JWT_SECRET);
}

exports.getUserById = function (req, res) {
    UserModel.findById(req.params.id, function (err, user) {
        res.json(user);
    });
};


exports.deleteUser = function (req, res) {
    let id = req.params.id;
    UserModel.findByIdAndDelete(id, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(404).send("user is not found");
        }
        res.json('User Profile deleted!');
    })
};
