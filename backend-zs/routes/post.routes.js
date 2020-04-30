module.exports = postRoutes
var userController = require('../controllers/users.contoller')

function postRoutes() {
    var mediaController = require('../controllers/media.controller')
    var postController = require('../controllers/post.controller')
    var router = require('express').Router()

    router.get('/generate-put-url', userController.verifyUserIsAdmin, mediaController.putUrl)
    router.post('/create', userController.verifyUserIsAdmin, postController.createPost)

    return router
}
