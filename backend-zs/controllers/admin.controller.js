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
        const dbGame = await GameModel.findById(gameId);
        dbGame.page = game.page;
        dbGame.types = game.types;
        dbGame.isDraft = false;
        dbGame.quizData = {
            // Map questions in order to skip updating the image;
            // image has to be set seperately
            questions: game.quizData.questions.map(question => {
                const dbQuestion = dbGame.quizData.questions.find(q => q.id === question.id);
                if (dbQuestion) {
                    question.image = dbQuestion.image;
                }
                return question;
            }),
        };
        await dbGame.save();
        res.send(`Game ${gameId} updated successfully.`);
    } catch (ex) {
        console.error(`Error while updating game ${gameId}!`);
        console.error(ex);
        res.send(ex);
        throw ex;
    }
}

exports.updatePuzzleImage = async function (req, res) {
    const gameId = req.params.gameId;
    const image = req.body.image;
    try {
        const dbGame = await GameModel.findById(gameId);
        if (image) {
            dbGame.puzzleData = {
                image: {
                    name: image.name,
                    data: image.data,
                }
            };
        } else {
            dbGame.puzzleData = undefined;
        }
        await dbGame.save();
        res.send(`Game ${gameId} question image updated successfully.`);
    } catch (ex) {
        console.error(`Error while updating question image for game ${gameId}!`);
        console.error(ex);
        res.send(ex);
        throw ex;
    }
}

exports.updateQuestionImage = async function (req, res) {
    const gameId = req.params.gameId;
    const questionId = parseInt(req.params.questionId);
    const image = req.body.image;
    try {
        const dbGame = await GameModel.findById(gameId);
        dbGame.quizData = {
            questions: dbGame.quizData.questions.map(question => {
                if (question.id !== questionId) return question;
                question.image = {
                    name: image.name,
                    data: image.data,
                };
                return question;
            }),
        }
        await dbGame.save();
        res.send(`Game ${gameId} question image updated successfully.`);
    } catch (ex) {
        console.error(`Error while updating question image for game ${gameId}!`);
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