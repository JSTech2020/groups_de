module.exports = projectRoutes;
var userController = require('../controllers/users.contoller')

function projectRoutes() {
    var projectController = require('../controllers/projects.controller')
    var router = require('express').Router()
    router.get('/', projectController.getProjects)
    router.get('/:projectId', projectController.getProjectById)
    router.delete('/:projectId', projectController.verifyProjectOwnership, projectController.deleteProject)
    router.post('/', projectController.validatePostProjectInput, projectController.verifyAssociatedImages, userController.verifyUserIsAdmin, projectController.createProject)
    router.put('/participate/:projectId', projectController.submitParticipation)
    router.put('/participate/verify/:projectId/:token', projectController.verifyParticipation)
    router.put('/:projectId', projectController.verifyProjectOwnership, projectController.verifyAssociatedImages, projectController.updateProject)

    return router
}

