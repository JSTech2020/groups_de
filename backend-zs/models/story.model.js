const mongoose = require('mongoose')

var Story = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authorImage: {
        type: String,
        required: false,
        default: ""
    },
    shortDescription: {
        type: String,
        required: true
    },
    storyPages: {
        type: [String],
        required: true,
    },
    categories: [String],
    numberLikes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }

})

module.exports = mongoose.model('Story', Story);