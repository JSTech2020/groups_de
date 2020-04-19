var Feed = require("../models/feed.model")

exports.getFeed = function(_req,res) {
    Feed.find()
        .select('title content numberLikes published _id likes')
        .map(item =>
            {
                console.log(item)
                if(item["likes"].includes(req.params.id)){
                    item["liked"] = true
                }
                else
                    it["liked"] = false
            }
        )
        .then(posts => { res.json({result: posts}) })
        .catch(error => res.status(500).json({ error: error.message }))
}
exports.getPost = function (req, res) {
    Feed.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(error => res.status(500).json({ error: error.message }))
}
exports.likePost = function (req, res){
    const user_id = req.body.user_id;
    const feed_id = req.body.feed_id;
    Feed.findById(feed_id, function(err, post){

        if(post.likes.includes(user_id))
        {
            //We unlike the post!
            const likesIndex = post.likes.indexOf(user_id)
            if(likesIndex>-1)
            {
                post.likes.splice(likesIndex,1);
                post.numberOfLikes = post.numberOfLikes -1;
            }
        }
        else
        {
            //We like the post
            post.likes.push(user_id);
            post.numberOfLikes = post.numberOfLikes + 1;

        }
        post.save(function (err) {
            if(err) {
                console.error(err.message);
            }
        });

        }
    ).catch(error => res.status(500).json({ error: error.message }))

}