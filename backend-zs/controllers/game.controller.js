const UserModel = require('../models/user.model');
const PlayedGame = require('../models/playedGame.model');
const Game = require('../models/game.model');
const eventEmitter = require('../events/zs-event-emitter');
const events = require('../events/events');

exports.submitQuiz = async function (req, res) {
  let gameId = req.params.id;
  let userId = req.user._id;
  let game = await Game.findById(gameId).exec();
  if(game === null){
    res.status(404).json({error: 'gameId not found'})
    return;
  }
  let playedGame = await PlayedGame.findOne({game: gameId, user: userId}).exec();
  if(playedGame === null){
    playedGame = await PlayedGame.create({
      user: userId,
      game: gameId
    });
  }
  
  // Check user input: submitted reward can't exceed the sum of all questions rewards
  const { reward } = req.body;
  const alreadyRewarded = playedGame.quizPoints ? playedGame.quizPoints : 0;
  let maxReward = game.quizData.questions.reduce((acc, q) => acc + (q.difficulty + 1) * 5, 0);
  const actualReward = Math.min(reward, maxReward);
  const newlyRewarded = actualReward - alreadyRewarded;
  if(newlyRewarded > 0){
    let mongoUser = await UserModel.findById(userId).exec();
    mongoUser.stars += newlyRewarded;
    mongoUser.save();
    playedGame.quizPoints = actualReward;
    playedGame.save();
    eventEmitter.emit(events.quiz.answered, mongoUser, playedGame, newlyRewarded, maxReward);
  }
  
  let resp = {
    reward: reward <= maxReward ? reward : 0,
    allCorrect: reward === maxReward
  }
  res.json(resp);
}

exports.submitPuzzle = async function(req, res){
  let gameId = req.params.id;
  let userId = req.user._id;
  let game = await Game.findById(gameId).exec();
  if(game === null){
    res.status(404).json({error: 'gameId not found'})
    return;
  }
  let playedGame = await PlayedGame.findOne({game: gameId, user: userId}).exec();
  if(playedGame === null){
    playedGame = await PlayedGame.create({
      user: userId,
      game: gameId
    });
  }
  
  //TODO: Continue here.....
  //const maxReward = 
  const alreadyRewarded = playedGame.puzzlePoints ? playedGame.puzzlePoints : 0;

}