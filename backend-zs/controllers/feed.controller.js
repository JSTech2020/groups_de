var Feed = require("../models/feed.model").Post
var User = require("../models/user.model")
exports.getFeed = function(_req,res) {
    Feed.find()
        .sort("published")
        .limit(10)
        .select('title content numberLikes published _id likes')
        .then(posts => { res.json({result: posts}) })
        .catch(error => res.status(500).json({ error: error.message }))
}
exports.getPost = function (req, res) {
    Feed.findById(req.params.id)
        .then(posts => res.json({result: posts}))
        .catch(error => res.status(500).json({ error: error.message }))
}

exports.likePost = function (req, res){
    const user_id = req.body.user_id;
    const feed_id = req.body.feed_id;
    Feed.findById(feed_id, function(err, post){
        if(post.likes.includes(user_id))
        {
            //We unlike the post!
            console.log(`we unliked the post ${feed_id}`)
            const likesIndex = post.likes.indexOf(user_id)
            if(likesIndex>-1)
            {
                post.likes.splice(likesIndex,1);
                post.numberOfLikes = post.numberOfLikes -1;
            }
            User.findByIdAndUpdate(user_id, {"$pull": {"likes": feed_id}},     { "new": true, "upsert": true },
                function (err, msg) {
                    if (err) throw err;
                    console.log(msg);
                });

        }
        else
        {
            console.log(`we liked the post ${feed_id}`)
            //We like the post
            post.likes.push(user_id);
            post.numberOfLikes = post.numberOfLikes + 1;

            User.findByIdAndUpdate(user_id, {"$push": {"likes": feed_id}},{ "new": true, "upsert": true },
                function (err, msg) {
                    if (err) throw err;
                    console.log(msg);
                });

        }
        post.save(function (err) {
            if(err) {
                console.error(err.message);
            }
        });

        }
    ).catch(error => res.status(500).json({ error: error.message }))
}
exports.commentPost = function (req, res){
    const feed_id = req.body.feed_id;
    const comment = req.body.comment;
    const user_id = req.body.user_id;
    console.log("Post has been commented by user")
    const CommentModel = require("../models/feed.model").Comment
    const newComment = new CommentModel({
        comment: comment,
        user: user_id,
        inappropriate: false
    })
    Feed.findByIdAndUpdate(feed_id, {"$push": {"comments": newComment }},
    function (err, msg) {
        if (err) throw err;
        res.status(200)
        console.log(msg)})
}