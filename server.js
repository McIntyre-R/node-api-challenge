const express = require('express');
const cors = require('cors')
const middleware = require('./middleware/middleware')
const projectRouter = require('./routers/projectRouter')
const actionsRouter = require('./routers/actionsRouter')
const server = express();


server.use(middleware.logger);
server.use(express.json());
server.use(cors())
server.get('/', (req,res) => {
    res.send('<h1>This parties gettin crazy</h1>');
})

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionsRouter)

server.use(middleware.errorHandler)


module.exports = server; 