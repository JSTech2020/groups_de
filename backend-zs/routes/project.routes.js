module.exports = projectRoutes;

function projectRoutes() {
    var projectController = require('../controllers/projects.controller')
    var router = require('express').Router()
    router.get('/', projectController.getProjects)
    router.get('/:projectId', projectController.getProjectById)
    router.delete('/:projectId', projectController.verifyProjectOwnership, projectController.deleteProject)
    return router
}

