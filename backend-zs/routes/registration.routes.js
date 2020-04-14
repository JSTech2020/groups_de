const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/user.model');
const auth = require('../auth/auth');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported');
    })
    .post(auth.verifyUser,
        (req, res, next) => {
            Users.findById(req.user._id)
                .then((user) => {
                    if (user != null) {
                        user.set(req.body);
                        user.save()
                            .then((dish) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(user);
                            }, (err) => next(err));
                    } else {
                        //send error to app.js which will handle it
                        err = new Error('User not found');
                        err.statusCode = 404;
                        return next(err);
                    }
                }, (err) => next(err))
                .catch((err) => next(err));
        })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported');
    });

module.exports = userRouter;