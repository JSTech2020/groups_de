var Project = require('../models/project.model')
var User = require('../models/user.model')
var S3 = require('../services/s3')
var ProjectJoiSchema = require('../models/project.joi.model')
var crypto = require('crypto');
const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

exports.getProjects = function (_req, res) {
    Project.find().select('projectOwner info')
        .then(projects => {
            res.json(projects)
        })
        .catch(error => res.status(500).json({ error: error.message }))
}

exports.getProjectById = function (req, res) {
    Project.findById(req.params.projectId).then(project => {
        res.json(project)
    }).catch(error => res.status(500).json({ error: error.message }))
};

exports.deleteProject = function (req, res) {
    let project = req.project
    S3.deleteElements(project.media, process.env.S3_BUCKET_NAME)
    S3.deleteElements(project.feed.flatMap(element => element.media), process.env.S3_BUCKET_NAME)

    Project.deleteOne({ _id: project._id }).then(_ => {
        res.json('project with id ' + req.params.projectId + ' was deleted successfully');
    }).catch(error => res.status(500).json({ error: error.message }))
};

exports.updateProject = function (req, res) {
    Project.updateOne({ _id: req.params.projectId }, req.body.project)
        .then(_ => { res.json('Project was updated successfully') })
        .catch(error => res.status(500).json({ error: error.message }))
}

exports.createProject = function (req, res) {
    let project = new Project(req.body.project)
    project.projectOwner = req.user._id
    project.save().then(project => {
        res.json('project: ' + project.info.title + ' was created successfully');
    }).catch(error => res.status(500).json({ error: error }))
}

exports.submitParticipation = function (req, res) {
    req.body.participant.confirmationToken = crypto.randomBytes(24).toString('hex');
    const activationLink = process.env.ZS_URL + '/participation/verify/' + req.params.projectId + '/' + req.body.participant.confirmationToken;

    Project.findOneAndUpdate({ _id: req.params.projectId }, { $push: { participants: req.body.participant } }, { useFindAndModify: false })
        .then(project => {
            const request = mailjet.post('send', { version: 'v3.1' }).request({
                "Messages": [{
                    "From": {
                        "Email": "felix@zukunftschreiben.org",
                    },
                    "To": [{
                        "Email": req.body.userEmail,
                    }],
                    "Subject": `Teilnahme am Project ${project.info.title} bestätigen`,
                    "HTMLPart": `Vielen Dank für dein Interesse an der Teilnahme am Projekt ${project.info.title}. Klicke den <a href=${activationLink}>Link</a> und bestätige deine Teilnahme!`
                }]
            })

            request.then(_ => { res.json('participant submission send successfully'); })
                .catch(error => res.status(503).json({ error: error.message }))
        })
        .catch(error => res.status(501).json({ error: error.message }))
}

exports.verifyParticipation = async function (req, res) {
    try {
        const token = req.params.token;
        const projectId = req.params.projectId;
        const project = await Project.findOne({ _id: projectId });
        if (!project) {
            return res.json({ success: false, message: 'Project not found' })
        }

        let foundParticipant
        project.participants.forEach(participant => {
            if (participant.confirmationToken === token) {
                participant.isConfirmed = true;
                foundParticipant = participant;
            }
        })
        if (!foundParticipant || foundParticipant.user != req.body._id) {
            return res.json({ success: false, message: 'Participant for project not found' })
        }

        const projectOwner = await User.findById(project.projectOwner)
        if (!projectOwner) {
            return res.json({ success: false, message: 'Project owner not found' })
        }

        await project.save();
        await mailjet.post('send', { version: 'v3.1' }).request({
            "Messages": [{
                "From": {
                    "Email": "felix@zukunftschreiben.org",
                },
                "To": [{
                    "Email": projectOwner.email,
                }],
                "Subject": `Teilnahme am Project ${project.info.title} bestätigen`,
                "HTMLPart": `Eine Teilnahme am Projekt ${project.info.title} wurde bestätigt. <br> <br> Teilnehmer: ${foundParticipant.name} <br> Mehr Informationen: ${foundParticipant.information}<br> Kontakt: ${foundParticipant.contact}`
            }]
        })
        await res.json({ success: true, message: 'Successfully confirmed participation' });
    } catch (e) {
        await res.json({ success: false, message: e })
    }
};

exports.verifyAssociatedImages = async (req, res, next) => {
    let project = req.body.project
    let allMedia = getAllMedia(project)
    let err = await S3.checkElements(allMedia, process.env.S3_BUCKET_NAME)
    if (err) {
        return res.status(err.statusCode).json({ error: err })
    }
    err = checkMediaBelongsToUser(allMedia, req.user._id)
    if (err) {
        return res.status(403).json({ error: err })
    }
    next()
}


exports.validatePostProjectInput = function (req, res, next) {
    req.body.project['projectOwner'] = req.user._id
    const err = ProjectJoiSchema.validate(req.body.project)
    if (err.error) { return res.status(422).json({ err: err.error.details }) }
    next()
}
exports.verifyProjectOwnership = function (req, res, next) {
    if (!req.user._id) {
        return res.status(400).json({ error: { code: 400, message: 'user id is missing' } })
    }
    Project.findOne({ projectOwner: req.user._id, _id: req.params.projectId })
        .then(project => {
            if (project) {
                req.project = project
                next()
            } else {
                res.status(401).json({
                    error: {
                        code: '401',
                        message: 'user does not own project with id ' + req.params.projectId,
                    }
                })
            }
        })
        .catch(error => res.status(500).json({ error: error }))
}

function checkMediaBelongsToUser(media, user_id) {
    for (var element of media) {
        if (!element.startsWith(user_id + '-')) {
            return { message: 'element ' + element + ' does not belong to user ' + user_id }
        }
    };
}

function getAllMedia(project) {
    let allMedia = []
    if (project.info && project.info.projectImage)
        allMedia = allMedia.concat(project.info.projectImage)
    if (project.media)
        allMedia = allMedia.concat(project.media)
    if (project.feed)
        allMedia = allMedia.concat(project.feed.flatMap(post => { return post.media }))
    return allMedia
}
