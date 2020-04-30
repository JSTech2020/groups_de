module.exports = projectRoutes;
var userController = require('../controllers/users.contoller')

function projectRoutes() {
    var projectController = require('../controllers/projects.controller')
    var router = require('express').Router()
    router.get('/', projectController.getProjects)
    router.get('/:projectId', projectController.getProjectById)
    router.delete('/:projectId', projectController.verifyProjectOwnership, projectController.deleteProject)
    router.post('/', projectController.validatePostProjectInput, projectController.verifyAssociatedImages, userController.verifyUserIsAdmin, projectController.createProject)
    router.put('/:projectId', projectController.verifyProjectOwnership, projectController.updateProject)
    return router
}

