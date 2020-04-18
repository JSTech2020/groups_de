module.exports = feedRoutes;

function feedRoutes() {
    var feedController = require('../controllers/feed.controller')
    var router = require('express').Router()

    router.get('/', feedController.getFeed)
    router.get('/like/:feedid/:userid')
    router.get('/:id', feedController.getPost)

    return router
}
