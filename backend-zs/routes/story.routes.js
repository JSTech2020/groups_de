module.exports = storyRoutes

function storyRoutes() {
    var storiesController = require('../controllers/stories.controller')
    var router = require('express').Router()

    router.get('/', storiesController.getStories)
    router.get('/:id', storiesController.getStory)
    router.delete('/:id', storiesController.deleteStory)
    router.post('/', storiesController.createStory)
    router.post('/update', storiesController.updateStory)

    return router
}
