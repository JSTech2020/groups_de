module.exports = feedRoutes;

function feedRoutes() {
    var feedController = require('../controllers/feed.controller')
    var router = require('express').Router()

    router.get('/:id', feedController.getFeed)
    router.post('/like/', feedController.likePost)
    router.get('/post/:id', feedController.getPost)

    return router
}
