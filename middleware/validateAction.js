const express = require('express')
server = express()

module.exports = () => {
    return (req, res, next) => {
        const action = req.body;
        if(action.description.length > 128) {
            res.status(400).json({
                message: "Action description must be 128 characters max"
            })
        }else if(!action.description || !action.notes) {
            res.status(400).json({
                message: "The description or notes provided is invalid. Cannot be blank."
            })
        }
        else next;
    }
}