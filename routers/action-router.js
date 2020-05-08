const express = require('express');
const router = express.Router();
const Action = require('../data/helpers/actionModel');
const validateAction = require('../middleware/validateAction');

router.get('/', (req, res, next) => {
    Action.get()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Action.get(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(next)
})

router.post('/', validateAction(), (req, res, next) => {
    var newAction = req.body;
    Action.insert(newAction)
        .then(response => {
            res.status(201).json({
                message: `${response.description} successfully added to project ${response.project_id}`
            })
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    Action.remove(id)
        .then(response => {
            res.status(201).json({
                message: `${response} actions successfully deleted`
            })
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var changes = req.body;
    Action.update(id, changes)
        .then(response => {
            res.status(201).json({
                messsage: `Updated action: ${response}`
            })
        })
        .catch(next)
})

module.exports = router;