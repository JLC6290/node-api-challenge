const express = require('express');
const router = express.Router();
const Project = require('../data/helpers/projectModel');

// const validateProject = require('../middleware/validateProject');


router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(400).json({
                message: "Error retrieving data",
            })
        })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Project.get(id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
    const id = req.params.id;
    Project.get(id)
        .then(project => {
            if(project) {
                Project.getProjectActions(id)
                    .then(action => {
                        res.status(200).json(action);
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: "Internal server error with getProjectActions",
                        })
                    })
            }
        })
        .catch(next)
})

router.post('/', validateProject, (req, res) => {
    var newProject = req.body;
    console.log(newProject);
    Project.insert(newProject)
        .then(project => {
            res.status(201).json({
                message: `Project ${project.name} successfully added`,
            })
        })
        .catch(error => {
            res.status(500).json({error})
        })
})

router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    Project.remove(id)
        .then(response => {
            res.status(200).json({
                message: "project successfully deleted",
            })
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var changes = req.body;
    Project.update(id, changes)
        .then(response => {
            res.status(201).json({
                message: `Updated project: ${response}`,
            })
        })
        .catch(next())
})

function validateProject (req, res, next) {
        const project = req.body;
            if(!project.name || !project.description) {
                res.status(400).json({
                    message: "The name or description provided is invalid. Cannot be blank.",
                })
            }else {
                next();
            }
    }



module.exports = router;