const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayedGame = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    quizPoints: Number,
    puzzlePoints: Number,
    oceanCleanerPoints: Number,
})

module.exports = mongoose.model('PlayedGame', PlayedGame);
