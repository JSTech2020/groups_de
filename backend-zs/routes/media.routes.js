module.exports = mediaRoutes;

function mediaRoutes() {
    var mediaController = require('../controllers/media.controller')
    var S3 = require('../services/s3')
    var router = require('express').Router();
    router.post('/upload', S3.multerS3.array("images"), mediaController.uploadMedia)
    router.get('/:fileName', mediaController.getFile)
    return router
}

