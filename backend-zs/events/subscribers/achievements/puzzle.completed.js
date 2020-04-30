var Achievement = require('./achievement');
var events = require('../../events');

class PuzzleCompleted extends Achievement{

  constructor(){
    super();

    // Requirements and corresponding achievement identifiers
    this.identifier = 'puzzle_completed'
    const rewards = [
      {
        puzzles: 1,
        reward: 5
      },
      {
        puzzles: 5,
        reward: 25
      },
      {
        puzzles: 10,
        reward: 75
      },
      {
        puzzles: 20,
        reward: 250
      },
    ].map(reward => {
      return {...reward, identifier: `${this.identifier}_${reward.puzzles}`}
    });
    
    this.achievements = {}
    rewards.forEach(reward => {
      this.achievements[reward.puzzles] = reward
    });

    // To listen for events, every Achievement needs to call initialize(...) with the corresponding event subscriptions
    this.initialize({
      [events.puzzle.completed]: this.onPuzzleCompleted.bind(this)
    });
  }

  async onPuzzleCompleted(user, playedGame, rewarded, timeTaken){
    let progressIndex = this.getAchievementProgressIndex(this.identifier, user);
    // User has answered all questions correctly for the first time
    if(rewarded > 0){
      // Increment counter (counts how many quizzes were answered correctly)
      const nextCounter = user.achievementProgress[progressIndex].counter + 1;
      user.achievementProgress[progressIndex].counter = nextCounter;
      const achievement = this.achievements[nextCounter];
      // Check if achievement reached and achievement not yet in users achievements array
      if(achievement && !user.achievements.includes(achievement.identifier)){
        user.achievements.push(achievement.identifier);
        user.achievements.sort();
        this.onAchieved(achievement.identifier, user, achievement.reward, {})
      }
      user.save();
    }
  }

}
module.exports = new PuzzleCompleted();