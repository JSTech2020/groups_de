var Feed = require("../models/feed.model").Post
var User = require("../models/user.model")
exports.getFeed = function(_req,res) {
    const page = _req.params.page
    Feed.find()
        .sort({published: -1})
        .skip(page*10)
        .limit(10)
        .select('username avatar title content numberLikes published likes _id')
        .then(posts => { res.json({ result: posts }) })
        .catch(error => res.status(500).json({ error: error.message }))
}
exports.getPost = function (req, res) {
    Feed.findById(req.params.id)
        .select('username avatar title content numberLikes published likes comments _id')
        .then(posts => res.json({ result: posts }).status(200))
        .catch(error => res.status(500).json({ error: error.message }))
}

exports.likePost = function (req, res) {
    const user_id = req.body.user_id;
    const feed_id = req.body.feed_id;
    Feed.findById(feed_id, function (err, post) {
        if (post.likes.includes(user_id)) {
            //We unlike the post!
            console.log(`user ${user_id} unliked the post ${feed_id}`)
            const likesIndex = post.likes.indexOf(user_id)
            if (likesIndex > -1) {
                post.likes.splice(likesIndex, 1);
                post.numberOfLikes = post.numberOfLikes - 1;
            }
            User.findByIdAndUpdate(user_id, { "$pull": { "likes": feed_id } }, { "new": true, "upsert": true },
                function (err, msg) {
                    if (err) throw err;
                    console.log(msg);
                });

        }
        else {
            console.log(`user ${user_id} liked the post ${feed_id}`)
            //We like the post
            post.likes.push(user_id);
            post.numberOfLikes = post.numberOfLikes + 1;

            User.findByIdAndUpdate(user_id, { "$push": { "likes": feed_id } }, { "new": true, "upsert": true },
                function (err, msg) {
                    if (err) throw err;
                    console.log(msg);
                });

        }
        post.save(function (err,msg) {
            if (err,msg) {
                if(err)
                console.error(err.message);
                console.log(msg);
            }
        });

    }
    ).catch(error => res.status(500).json({ error: error.message }))
}
exports.commentPost = function (req, res) {
    const feed_id = req.body.feed_id;
    const comment = req.body.comment;
    const user_id = req.body.user_id;
    const firstname = req.body.firstname
    const avatar = req.body.avatar
    console.log("Post has been commented by user")
    const CommentModel = require("../models/feed.model").Comment
    const newComment = new CommentModel({
        comment: comment,
        user: user_id,
        firstname: firstname,
        avatar: avatar,
        inappropriate: false
    })
    Feed.findByIdAndUpdate(feed_id, { "$push": { "comments": newComment } },
        function (err, msg) {
            if (err) throw err;
            res.status(200)
            console.log(msg)
        })
}

exports.deletePost = function (req, res) {
    let post_id = req.params.id;
    Feed.findByIdAndDelete(post_id, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(404).send("Post is not found");
        }
        res.json('Post deleted!');
    })
};

exports.deleteComment = function (req, res) {
    const feed_id = req.body.feed_id
    const comment_id = req.params.id;
    Feed.findByIdAndUpdate(feed_id, { "$pull": { "comments": {_id: comment_id} } },
        function (err, msg) {
            if (err) throw err;
            res.status(200)
            console.log(msg)
        })
};

