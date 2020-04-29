var Story = require('../models/story.model')
var Game = require('../models/game.model')

exports.getStories = function (_req, res) {
    Story.find()
        .select('title author shortDescription numberLikes categories')
        .then(stories => { res.json(stories) })
        .catch(error => res.status(500).json({ error: error.message }))
};

exports.getStory = function (req, res) {
    Story.findById(req.params.id)
        .then(story => res.json(story))
        .catch(error => res.status(500).json({ error: error.message }))
}

exports.getGames = function (req, res) {
    Game.find({story: req.params.id, isDraft: {$ne: true}})
        .then(games => res.json(games))
        .catch(error => res.status(500).json({ error: error.message }))
}