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
    firstname: {
        type: String,
        default: ''
      },
      avatar: {
        type: String,
        default: '',
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
    username:{
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: '',
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

exports.Post = mongoose.model('Post', Post);
exports.Comment = mongoose.model('Comment', commentSchema)