const UserModel = require('../models/user.model');
const PlayedGame = require('../models/playedGame.model');
const Game = require('../models/game.model');
const eventEmitter = require('../events/zs-event-emitter');
const events = require('../events/events');

async function getPlayedGame(gameId, userId){
  let playedGame = await PlayedGame.findOne({game: gameId, user: userId}).exec();
  if(playedGame === null){
    playedGame = await PlayedGame.create({
      user: userId,
      game: gameId
    });
  }
  return playedGame;
}

exports.submitQuiz = async function (req, res) {
  let gameId = req.params.id;
  let userId = req.user._id;
  
  let game = await Game.findById(gameId).exec();
  if(game === null){
    res.status(400).json({error: 'Invalid request'});
    return;
  }

  let playedGame = await getPlayedGame(gameId, userId);
  if(playedGame === null){
    res.status(400).json({error: 'Invalid request'});
    return;
  }
  
  let mongoUser = await UserModel.findById(userId).exec();

  // Check user input: submitted reward can't exceed the sum of all questions rewards
  const { reward } = req.body;
  const alreadyRewarded = playedGame.quizPoints ? playedGame.quizPoints : 0;
  let maxReward = game.quizData.questions.reduce((acc, q) => acc + (q.difficulty + 1) * 2, 0);
  const actualReward = Math.min(reward, maxReward); // Cap the reward
  const newlyRewarded = actualReward - alreadyRewarded;
  if(newlyRewarded > 0){
    mongoUser.stars += newlyRewarded;
    await mongoUser.save();
    playedGame.quizPoints = actualReward;
    playedGame.save();
  }

  eventEmitter.emit(events.quiz.answered, mongoUser, playedGame, actualReward, newlyRewarded, maxReward);
  
  res.json({reward: newlyRewarded});
}

exports.submitPuzzle = async function(req, res){
  let gameId = req.params.id;
  let userId = req.user._id;
  const { timeTaken } = req.body;

  let game = await Game.findById(gameId).exec();
  if(game === null || !timeTaken){
    res.status(400).json({error: 'Invalid request'});
    return;
  }

  let playedGame = await getPlayedGame(gameId, userId);
  if(playedGame === null){
    res.status(400).json({error: 'Invalid request'});
    return;
  }
  
  let mongoUser = await UserModel.findById(userId).exec();
  const maxReward = 10
  const alreadyRewarded = playedGame.puzzlePoints ? playedGame.puzzlePoints : 0;
  const newlyRewarded = maxReward - alreadyRewarded;
  if(newlyRewarded > 0){
    mongoUser.stars += newlyRewarded;
    await mongoUser.save();
    playedGame.puzzlePoints = maxReward;
    playedGame.save();
  }
  
  eventEmitter.emit(events.puzzle.completed, mongoUser, newlyRewarded, timeTaken)

  res.json({reward: newlyRewarded});
}