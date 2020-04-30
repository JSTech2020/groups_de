var eventEmitter = require('../../zs-event-emitter');
var events = require('../../events');

class Achievement {

  subscribeEvents(){
    Object.keys(this.eventHandlers).forEach(eventKey => {
      this.eventEmitter.on(eventKey, this.eventHandlers[eventKey]);
    });
  }

  unsubscribeEvents(){
    Object.keys(this.eventHandlers).forEach(eventKey => {
      this.eventEmitter.removeListener(eventKey, this.eventHandlers[eventKey]);
    });
  }

  onAchieved(achievementIdentifier, user, reward, eventData){
    console.log(achievementIdentifier, user, reward, eventData);
    this.eventEmitter.emit(events.achievement.completed, achievementIdentifier, user, reward, eventData);
  }

  getAchievementProgressIndex(achievementId, user){
    let index = -1;
    if(!user.achievementProgress){
      user.achievementProgress = [];
    }else{
      let i = 0;
      for(let p of user.achievementProgress){
        if(p.achievementId === achievementId){
          index = i;
          break;
        }
        i++;
      }
    }
    if(index === -1){
      let progress = {
        achievementId: achievementId,
        counter: 0
      }
      user.achievementProgress.push(progress)
      index = user.achievementProgress.length -1;
    }
    return index;
  }

  initialize(eventSubscriptions){
    this.eventHandlers = eventSubscriptions;
    this.eventEmitter = eventEmitter;
    this.subscribeEvents();
  }

}

module.exports = Achievement;