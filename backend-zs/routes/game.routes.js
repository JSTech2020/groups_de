function gameRoutes() {
  var quizController = require('../controllers/game.controller')
  var express = require('express');
  var router = express.Router();

  router.put('/:id/submitQuiz', quizController.submitQuiz)

  return router
}

module.exports = gameRoutes;