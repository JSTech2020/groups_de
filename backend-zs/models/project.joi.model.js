const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

let joiSchema = Joi.object({
    projectOwner: Joi.objectId().required(),
    info: Joi.object().keys({
        title: Joi.string().max(60).required(),
        description: Joi.string().max(1500).required(),
        activities: Joi.array().items(Joi.string()),
        skills: Joi.array().items(Joi.string()),
        timeNeeded: Joi.string(),
        contact: Joi.array().items(Joi.object().keys({
            name: Joi.string(),
            phoneNumber: Joi.string().trim().regex(/^[0-9]{7,10}$/),
            email: Joi.string().email(),
        })),
        location: Joi.object().optional().keys({
            type: Joi.string().valid('Point').required(),
            coordinates: Joi.array().items(Joi.number()).required(),
        }),
        numberVolunteers: Joi.number(),
        projectImage: Joi.string(),
    }),
    participationInfo: Joi.object().keys({
        moreInformation: Joi.string(),
        media: Joi.array().items(Joi.string()).min(1),
    }),
    media: Joi.array().items(Joi.string()),
    feed: Joi.array().optional().items(Joi.object({
        content: Joi.string(),
        media: Joi.array().items(Joi.string()),
    })),
    participants: Joi.array().optional().items({
        user: Joi.objectId().required(),
        information: Joi.string(),
        timestamp: Joi.date().timestamp(),
        contact: Joi.string(),
        status: Joi.string()
    })
})

module.exports = joiSchema