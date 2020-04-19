const PostModel = require('../models/posts')

exports.createPost = function (req, res) {
    var post = req.body;
    post.user = req.user._id
    PostModel.create(post, (err, post) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(post);
        }
    })
}
