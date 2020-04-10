module.exports = storyRoutes

function storyRoutes() {
    var storiesController = require('../controllers/stories.controller')
    var router = require('express').Router()

    router.get('/', storiesController.getStories)
    router.get('/:id', storiesController.getStory)

    return router
}
