const express = require('express');
const router = express.Router();
const Action = require('../data/helpers/actionModel');
const Project = require('../data/helpers/projectModel');

const validateAction = require('../middleware/validateAction');

router.get('/', (req, res, next) => {
    Action.get()
        .then(response => {
            res.status(200).json(response);
        })
        .catch();
})

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Action.get(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch()
})

router.post('/', validateAction(), checkProject(), (req, res, next) => {
    var newAction = req.body;
    Action.insert(newAction)
        .then(response => {
            res.status(201).json({
                message: `${response.description} successfully added to project ${response.project_id}`
            })
        })
        .catch()
})

router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    Action.remove(id)
        .then(response => {
            res.status(201).json({
                message: `${response} actions successfully deleted`
            })
        })
        .catch()
})

router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var changes = req.body;
    Action.update(id, changes)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            console.log(error);
        })
})

function checkProject () {
    return function(req, res, next) {
    var id = req.body.project_id;
    Project.get(id)
        .then(response => {
            if(!response){
                res.status(404).json({
                    message: "Project ID not found"
                })
            }
            next();
        })
        .catch()
        
    }
}



module.exports = router;