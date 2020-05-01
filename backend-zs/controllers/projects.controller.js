var Project = require('../models/project.model')
var S3 = require('../services/s3')
var ProjectJoiSchema = require('../models/project.joi.model')

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