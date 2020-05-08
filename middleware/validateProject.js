const express = require('express');
server = express();

module.exports = () => {
    return (req, res, next) => {
        const project = req.body;
            if(!project.name || !project.description) {
                res.status(400).json({
                    message: "The name or description provided is invalid. Cannot be blank.",
                })
            }else next();
    }
}