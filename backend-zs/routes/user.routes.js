module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('../controllers/users.contoller');
    var router = require('express').Router();

    router.get('/users', passport.authenticate('jwt', { session: false }), userController.getUsers);
    router.post('/signup', userController.signup);
    router.post('/login', userController.login);
    router.put('/signup/verify/:token', userController.verify);
    router.put('/users/:id', userController.updateUser);
    //router.put('/users/edit/email/:id', passport.authenticate('jwt', { session: false }), userController.updateUserEmail);
    //router.put('/users/edit/password/:id', passport.authenticate('jwt', { session: false }), userController.updateUserPassword);
    //router.put('/users/edit/firstname/:id', passport.authenticate('jwt', { session: false }), userController.updateUserFirstname);
    router.get('/users/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);
    router.delete('/users/:id', passport.authenticate('jwt', { session: false }), userController.deleteUser);
    //router.put('/users/:id', userController.updateUser);

    return router;
}
