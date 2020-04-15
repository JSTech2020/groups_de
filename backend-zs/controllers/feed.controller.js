var Posts = require("../models/feed.model")

exports.getFeed = function(req,res)
{
    Posts.find()
        .select('title content numberLikes')
        .then(posts => { res.json(posts) })
        .catch(error => res.status(500).json({ error: error.message }))
}
exports.getPost = function (req, res) {
    Posts.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(error => res.status(500).json({ error: error.message }))
}