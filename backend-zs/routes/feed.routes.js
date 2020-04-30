module.exports = feedRoutes;

function feedRoutes() {
    var feedController = require('../controllers/feed.controller')
    var router = require('express').Router()

    router.get('/:page', feedController.getFeed)
    //router.post('/', feedController.getPartOfFeed)
    router.post('/like/', feedController.likePost)
    router.get('/post/:id', feedController.getPost)
    router.post('/comment/', feedController.commentPost)
    router.delete('/post/:id', feedController.deletePost)
    router.delete('/comment/:id', feedController.deleteComment)
    return router
}
