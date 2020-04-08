const mongoose = require("mongoose");

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
    },
    shortDescription: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    numberLikes: {
        type: [String],
        required: true,
        default: []
    },
    games: [String]

});

var Story = mongoose.model('Story', Story);

module.exports = {
    Story: Story
};