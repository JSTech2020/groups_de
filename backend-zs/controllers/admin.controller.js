const GameModel = require('../models/game.model');
const StoryModel = require('../models/story.model');

exports.getStoryGames = async function (req, res) {
    const games = await GameModel.find({ story: req.params.storyId }).exec();
    res.send(games);
}

exports.putStoryGames = async function (req, res) {
    const storyId = req.params.storyId;

    // Fetch games from request and from database
    const putGames = req.body.games;
    const dbGames = await GameModel.find({ story: storyId }).exec();

    const putGameIds = new Set(putGames.map(game => game._id));
    const dbGameIds = new Set(dbGames.map(game => game._id.toString()));

    // Find new, existing and deleted games
    const newGames = new Set();
    const existingGames = new Set();
    const deletedGames = new Set();
    for (const id of putGameIds) {
        if (dbGameIds.has(id)) {
            existingGames.add(id);
        } else {
            newGames.add(id);
        }
    }
    for (const id of dbGameIds) {
        if (!putGameIds.has(id)) {
            deletedGames.add(id);
        }
    }

    // Add new games
    console.log('Adding games', newGames);
    for (const id of newGames) {
        try {
            const game = putGames.find(game => game._id === id);
            await new GameModel({
                story: storyId,
                page: game.page,
                types: game.types,
                quizData: {
                    questions: game.quizData.questions,
                }
            }).save();
        } catch (ex) {
            console.log('Error while adding a new game!');
            console.log(ex);
            res.send(ex);
            throw ex;
        }
    }

    // Update games
    console.log('Updating games', existingGames);
    for (const id of existingGames) {
        try {
            const putGame = putGames.find(game => game._id === id);
            const dbGame = dbGames.find(game => game._id.toString() === id);
            await dbGame.updateOne({
                page: putGame.page,
                types: putGame.types,
                quizData: {
                    questions: putGame.quizData.questions,
                },
            }).exec()
        } catch (ex) {
            console.log('Error while updating a game!');
            console.log(ex);
            res.send(ex);
            throw ex;
        }
    }

    // Delete games
    console.log('Deleting games', deletedGames);
    for (const id of deletedGames) {
        try {
            await GameModel.findByIdAndDelete(id);
        } catch (ex) {
            console.log('Error while deleting a game!');
            console.log(ex);
            res.send(ex);
            throw ex;
        }
    }

    res.send('Update successfull.');
}