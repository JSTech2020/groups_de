module.exports = adminRoutes

const adminController = require('../controllers/admin.controller')
const userController = require('../controllers/users.contoller')


function adminRoutes() {
    const router = require('express').Router();

    // Authorize the user - needs to be admin to access
    router.use('/', userController.verifyUserIsAdmin);

    router.get('/games/:storyId', adminController.getStoryGames)
    router.put('/games/:storyId', adminController.putStoryGames)

    return router
}
