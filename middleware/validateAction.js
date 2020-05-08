const express = require('express')
server = express()
const Project = require('../data/helpers/projectModel');


module.exports = () => {
    return (req, res, next) => {
        var action = req.body;
        // var id = req.body.project_id;
        // Project.get(id)
        //     .then(response => {
        //         res.send(response)
        //         if(!response){
        //             res.status(404).json({
        //                 message: "Project ID not found"
        //             })
        //         }
        //     })
        //     .catch(error => {

        //     })
        if(action.description.length > 128) {
            res.status(400).json({
                message: "Action description must be 128 characters max"
            })
        }else if(!action.description || !action.notes) {
            res.status(400).json({
                message: "The description or notes provided is invalid. Cannot be blank."
            })
        }else next();
    }
}