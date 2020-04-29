const mongoose = require('mongoose')
require('mongoose-type-url')

const Point = mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});


var Project = mongoose.Schema({
    projectOwner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    info: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        activities: [String],
        skills: [String],
        timeNeeded: String,
        contact: [{
            name: String,
            phoneNumber: String,
            email: String
        }],
        numberVolunteers: Number,
        location: Point,
        projectImage: String,
    },
    participationInfo: {
        moreInformation: String,
        media: [String],
    },
    media: [String],
    feed: [{
        content: String,
        media: [String],
    }],
    participants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: String,
        information: String,
        timestamp: { type: Date, default: Date.now },
        contact: String,
        status: {
            type: String,
            enum: ['pending', 'confirmed'],
            default: 'pending'
        }
    }]
});

module.exports = mongoose.model('Project', Project);