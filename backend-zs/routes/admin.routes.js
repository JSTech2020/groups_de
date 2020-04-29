module.exports = adminRoutes

const adminController = require('../controllers/admin.controller')
const userController = require('../controllers/users.contoller')


function adminRoutes() {
    const router = require('express').Router();

    // Authorize the user - needs to be admin to access
    router.use('/', userController.verifyUserIsAdmin);

    router.get('/stories/:storyId/games', adminController.getStoryGames)
    router.post('/stories/:storyId/games', adminController.createGame)

    router.put('/games/:gameId', adminController.updateGame)
    router.delete('/games/:gameId', adminController.deleteGame)

    return router
}
