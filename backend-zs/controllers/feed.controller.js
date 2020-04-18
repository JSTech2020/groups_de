var Feed = require("../models/feed.model")

exports.getFeed = function(_req,res) {
    Feed.find()
        .select('title content numberLikes published')
        .then(posts => { res.json({result: posts}) })
        .catch(error => res.status(500).json({ error: error.message }))
}
exports.getPost = function (req, res) {
    Feed.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(error => res.status(500).json({ error: error.message }))
}
exports.likePost = function (req, res){
    Feed.findById(req.params.feed_id, function(err, post){
        if(req.params.user_id in post.likes)
        {
            //We unlike the post!
            const likesIndex = post.likes.indexOf(req.params.user_id)
            if(likesIndex>-1)
            {
                post.likes = post.likes.splice(likesIndex,1);
                post.numberOfLikes = post.numberOfLikes -1;
            }
        }
        else
        {
            //We like the post
            post.likes = post.likes.push(req.params.user_id);
            post.numberOfLikes = post.numberOfLikes + 1;

        }
        post.save(function (err) {
            if(err) {
                console.error('ERROR!');
            }
        });

        }
    ).catch(error => res.status(500).json({ error: error.message }))

}