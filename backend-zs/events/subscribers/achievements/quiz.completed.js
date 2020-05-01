var Achievement = require('./achievement');
var events = require('../../events');

class QuizCompleted extends Achievement{

  constructor(){
    super();

    // Requirements and corresponding unique achievement identifiers
    this.baseIdentifier = 'quiz_completed'
    const rewards = [
      {
        quizzes: 1,
        reward: 1
      },
      {
        quizzes: 5,
        reward: 5
      },
      {
        quizzes: 10,
        reward: 10
      },
      {
        quizzes: 20,
        reward: 20
      },
    ].map(reward => {
      return {...reward, identifier: `${this.baseIdentifier}_${reward.quizzes}`}
    });
    
    this.achievements = {}
    rewards.forEach(reward => {
      this.achievements[reward.quizzes] = reward
    });

    // To listen for events, every Achievement needs to call initialize(...) with the corresponding event subscriptions
    this.initialize({
      [events.quiz.answered]: this.onQuizAnswered.bind(this)
    });
  }

  async onQuizAnswered(user, playedGame, rewardRequested, rewarded, maxReward){
    let progressIndex = this.getAchievementProgressIndex(this.baseIdentifier, user);
    // User has answered all questions correctly for the first time
    if(playedGame.quizPoints >= maxReward && rewarded > 0){
      // Increment counter (counts how many quizzes were answered correctly)
      const nextCounter = user.achievementProgress[progressIndex].counter + 1;
      user.achievementProgress[progressIndex].counter = nextCounter;
      const achievement = this.achievements[nextCounter];
      // Check if achievement reached and achievement not yet in users achievements array
      if(achievement && !user.achievements.includes(achievement.identifier)){
        user.achievements.push({identifier: achievement.identifier});
        user.stars += achievement.reward;
        this.onAchieved(achievement.identifier, user, achievement.reward, {})
      }
      user.save();
    }
  }

}
module.exports = new QuizCompleted();