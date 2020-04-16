var Project = require('../models/project.model')
var S3 = require('../services/s3')

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

exports.verifyProjectOwnership = function (req, res, next) {
    if (!req.user._id) {
        res.status(400).json({ error: { code: 400, message: 'user id is missing' } })
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