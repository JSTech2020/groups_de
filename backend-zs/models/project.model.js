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
        projectImage: mongoose.SchemaTypes.Url,
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
    participants: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        information: String,
        timestamp: { type: Date, default: Date.now },
        contact: String,
        status: String
    }
});

module.exports = mongoose.model('Project', Project);