module.exports = userRoutes;

function userRoutes(passport) {
    var userController = require('../controllers/users.contoller');
    var router = require('express').Router();

    router.get('/users', passport.authenticate('jwt', { session: false }), userController.getUsers);
    router.post('/signup', userController.signup);
    router.post('/login', userController.login);
    router.put('/signup/verify/:token', userController.verify);
    router.put('/users/:id', passport.authenticate('jwt', { session: false }), userController.updateUser);
    router.get('/users/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);
    return router;
}
