const express = require('express')
const server = express()
const port = 4000
const projectsRouter = require('./routers/project-router')
// const actionsRouter = require('./routers/action-router')

server.use(express.json())

server.get('/', (req, res) => {
    res.json({message: "API functional"})
})

server.use('/api/projects', projectsRouter)
// server.use('/api/actions', actionsRouter)

//error middleware
server.use((err, req, res, next) => {
    console.log({err})
    res.status(500).json({
        error: "There was an error retrieving this data."
    })
})

server.listen(port, () => {
    console.log(`\n Server is Running on http://localhost:${port} \n`)
})