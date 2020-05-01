const events = {
  user: {
    signIn: 'onUserSignIn',
    signUp: 'onUserSignUp'
  },
  quiz: {
    answered: 'onQuizAnswered'
  },
  achievement: {
    completed: 'onAchievementCompleted'
  },
  puzzle: {
    completed: 'onPuzzleCompleted'
  },
  oceanCleaner: {
    completed: 'onOceanCleanerCompleted'
  },
}

module.exports = events;