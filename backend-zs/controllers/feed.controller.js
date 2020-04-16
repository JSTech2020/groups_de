var Feed = require("../models/feed.model")

exports.getFeed = function(_req,res) {
    Feed.find()
        .select('title content numberLikes')
        .then(posts => { res.json(posts) })
        .catch(error => res.status(500).json({ error: error.message }))
}
exports.getPost = function (req, res) {
    Feed.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(error => res.status(500).json({ error: error.message }))
}