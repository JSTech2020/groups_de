var Story = require('../models/story.model')

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