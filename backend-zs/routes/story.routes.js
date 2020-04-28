module.exports = storyRoutes
var userController = require('../controllers/users.contoller')

function storyRoutes() {
    var storiesController = require('../controllers/stories.controller')
    var router = require('express').Router()

    router.get('/', storiesController.getStories)
    router.get('/:id', storiesController.getStory)
    router.delete('/:id', userController.verifyUserIsAdmin, storiesController.deleteStory)
    router.post('/', userController.verifyUserIsAdmin, storiesController.createStory)
    router.post('/update', storiesController.updateStory)

    return router
}
