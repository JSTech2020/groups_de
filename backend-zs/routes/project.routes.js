module.exports = projectRoutes;

function projectRoutes() {
    var projectController = require('../controllers/projects.controller')
    var router = require('express').Router()
    router.get('/projects', projectController.getProjects)
    router.get('/projects/:projectId', projectController.getProjectById)
    return router
}

