const GameModel = require('../models/game.model');

exports.getStoryGames = async function (req, res) {
    const games = await GameModel.find({ story: req.params.storyId }).exec();
    res.send(games);
}

exports.createGame = async function (req, res) {
    const storyId = req.params.storyId;
    const game = req.body.game;
    try {
        const dbGame = await new GameModel({
            story: storyId,
            page: game.page,
            types: game.types,
            isDraft: true,
            quizData: {
                questions: game.quizData.questions,
            },
        }).save();
        console.log(dbGame);
        res.send(dbGame);
    } catch (ex) {
        console.error(`Error while creating a new game for story ${storyId}!`);
        console.error(ex);
        res.send(ex);
        throw ex;
    }
}

exports.updateGame = async function (req, res) {
    const gameId = req.params.gameId;
    const game = req.body.game;
    try {
        await GameModel.findByIdAndUpdate(gameId, {
            page: game.page,
            types: game.types,
            isDraft: false,
            quizData: {
                questions: game.quizData.questions,
            },
        }).exec();
        res.send(`Game ${gameId} updated successfully.`);
    } catch (ex) {
        console.error(`Error while updating game ${gameId}!`);
        console.error(ex);
        res.send(ex);
        throw ex;
    }
}

exports.deleteGame = async function (req, res) {
    const gameId = req.params.gameId;
    try {
        await GameModel.findByIdAndDelete(gameId);
        res.send(`Game ${gameId} deleted successfully.`);
    } catch (ex) {
        console.error(`Error while deleting game ${gameId}!`);
        console.error(ex);
        res.send(ex);
        throw ex;
    }
}