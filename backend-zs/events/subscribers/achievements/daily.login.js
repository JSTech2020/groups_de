var Achievement = require('./achievement');
var events = require('../../events');

class DailyLogin extends Achievement{

  constructor(){
    super();
    
    this.identifier = 'daily_login'

    this.initialize({
      [events.user.signIn] : this.onLogin.bind(this)
    }) 
  }

  onLogin = (user) => {
    console.log("TODO: Implement login reward in file /events/subscribers/achievements/daily.login.js");
    const wasLoggedInToday = false;
    if(!wasLoggedInToday){
      const eventData = {
        user: user
      }
      this.onAchieved(eventData);
    }
  }

}

module.exports = new DailyLogin();