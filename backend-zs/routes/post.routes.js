module.exports = postRoutes

function postRoutes() {
    var mediaController = require('../controllers/media.controller')
    var postController = require('../controllers/post.controller')
    var router = require('express').Router()

    router.get('/generate-get-url', mediaController.getUrl)
    router.get('/generate-put-url', mediaController.putUrl)
    router.post('/create', postController.createPost)

    return router
}
