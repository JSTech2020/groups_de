var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var passport = require('passport');
const bodyParser = require('body-parser');

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    inappropriate: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const Post = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: [String],
    numberLikes: {
        type: Number,
        default: 0
    },
    likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
    comments: [commentSchema],
    published: mongoose.Schema.Types.Date
}, {
    timestamps: true

});

Post.pre('validate', function(next)
{
    this.numberLikes = this.likes.length
    next();
});

module.exports = mongoose.model('Post', Post);