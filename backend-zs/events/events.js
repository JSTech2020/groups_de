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
  }
}

module.exports = events;