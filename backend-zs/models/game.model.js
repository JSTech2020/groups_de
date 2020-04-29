const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Game data that is used for quiz-type games (quiz-timer, quiz-badges, ocean-cleaner, memory)
const GameDataQuiz = new Schema({
    questions: [{
        id: Number, // id is uniqe among questions in the array
        question: String,
        answers: [String],
        correctAnswer: Number,
        difficulty: Number,
        image: {
            name: String,
            data: Buffer,
        },
    }]
})

// Game data that is used for puzzle-type games (puzzle)
const GameDataPuzzle = new Schema({
    image: Buffer,
})

const Game = new Schema({
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story'
    },
    page: Number,
    types: ['quiz-timer', 'quiz-badges', 'ocean-cleaner', 'memory', 'puzzle'],
    isDraft: Boolean, // To indicate new games that shouldn't be displayed yet
    quizData: GameDataQuiz,
    puzzleData: GameDataPuzzle,
})

module.exports = mongoose.model('Game', Game);
