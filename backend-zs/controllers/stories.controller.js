var Story = require('../models/story.model').Story;

exports.getStories = function (_req, res) {
    Story.find()
        .then(stories => { res.send(res.json(stories)) })
        .catch(error => res.send(res.json({ error: error.message })))
};

exports.getStory = function (req, res) {
    Story.findById(req.params.id)
        .then(story => res.send(res.json(story)))
        .catch(error => res.send(res.json({ error: error.message })))
}

exports.deleteStory = function (req, res) {
    Story.findByIdAndRemove(req.params.id)
        .then(() => res.send(res.json(req.params.id)))
        .catch(error => res.send(res.json({ error: error.message })))
}