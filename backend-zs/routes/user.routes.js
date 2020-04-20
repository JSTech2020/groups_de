module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('../controllers/users.contoller');
    var router = require('express').Router();

    router.get('/users', passport.authenticate('jwt', { session: false }), userController.getUsers);
    router.post('/signup', userController.signup);
    router.post('/login', userController.login);
    router.put('/signup/verify/:token', userController.verify);
    router.put('/users/:id', userController.updateUser);
    router.post('/users/:id', userController.comparePassword);
    router.get('/users/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);
    router.delete('/users/:id', passport.authenticate('jwt', { session: false }), userController.deleteUser);

    return router;
}
