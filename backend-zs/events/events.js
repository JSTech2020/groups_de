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
  }
}

module.exports = events;