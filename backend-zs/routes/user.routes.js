module.exports = userRoutes;

function userRoutes() {
    var userController = require('../controllers/users.contoller');
    var router = require('express').Router();

    router.get('/users', userController.getUsers);
    return router;
}