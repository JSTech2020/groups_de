var Achievement = require('./achievement');
var events = require('../../events');

class PuzzleSolvedFast extends Achievement{

  constructor(){
    super();

    // Requirements and corresponding achievement identifiers
    this.baseIdentifier = 'puzzle_solved_fast'
    
    this.achievements = [
      {
        timeTaken: 60,
        reward: 1
      },
      {
        timeTaken: 30,
        reward: 5
      },
      {
        timeTaken: 10,
        reward: 10
      },
      {
        timeTaken: 5,
        reward: 20
      }
    ].map(achievementData => {
      return {
        ...achievementData, 
        identifier: `${this.baseIdentifier}_${achievementData.timeTaken}`, 
        achieved: (timeTaken)=> timeTaken < achievementData.timeTaken
      }
    });

    // To listen for events, every Achievement needs to call initialize(...) with the corresponding event subscriptions
    this.initialize({
      [events.puzzle.completed]: this.onPuzzleCompleted.bind(this)
    });
  }

  async onPuzzleCompleted(user, rewarded, timeTaken){
    if(!timeTaken || timeTaken <= 0)
      return;

    let progressIndex = this.getAchievementProgressIndex(this.baseIdentifier, user);
    const userRecord = user.achievementProgress[progressIndex].counter; // The user's fastest time is saved here
    let newAchievements = [];
    if(userRecord === 0 || userRecord > timeTaken){ // New record for the user
      user.achievementProgress[progressIndex].counter = timeTaken;
      newAchievements = this.achievements.filter(achievement => {
        return achievement.achieved(timeTaken) && !user.achievements.includes(achievement.identifier)
      });
      newAchievements.forEach(achievement => {
        user.achievements.push({identifier: achievement.identifier});
        user.stars += achievement.reward;
      });
      await user.save();
    }
    newAchievements.forEach(achievement => this.onAchieved(achievement.identifier, user, achievement.reward, {}));
  }

}
module.exports = new PuzzleSolvedFast();