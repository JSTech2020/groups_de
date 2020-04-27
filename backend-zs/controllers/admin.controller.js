const GameModel = require('../models/game.model');
const StoryModel = require('../models/story.model');

exports.getStoryGames = async function (req, res) {
    const games = await GameModel.find({ story: req.params.storyId }).exec();
    res.send(games);
}
