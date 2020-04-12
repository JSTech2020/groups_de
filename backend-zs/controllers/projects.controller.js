var Project = require('../models/project.model');

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
