module.exports = userRoutes;

function userRoutes(passport, upload) {
    var userController = require('../controllers/users.contoller');
    var router = require('express').Router();

    router.get('/users', passport.authenticate('jwt', { session: false }), userController.getUsers);
    router.post('/signup', userController.signup);
    router.post('/login', userController.login);
    router.put('/signup/verify/:token', userController.verify);
    // router.post('/users/:userId/imageUpload', upload.single('avatar'), userController.uploadImage);
  router.post('/users/:userId/imageUpload', userController.uploadImage);

    return router;
}
