function gameRoutes() {
  var quizController = require('../controllers/game.controller')
  var express = require('express');
  var router = express.Router();

  router.put('/:id/submitQuiz', quizController.submitQuiz)
  router.put('/:id/submitPuzzle', quizController.submitPuzzle)
  router.put('/:id/submitOceanCleaner', quizController.submitOceanCleaner)
  router.put('/:id/submitMemory', quizController.submitMemory)

  return router
}

module.exports = gameRoutes;