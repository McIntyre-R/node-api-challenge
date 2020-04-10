const projects = require('../data/helpers/projectModel')
const actions = require('../data/helpers/actionModel')


function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.originalUrl}`)
    next()
}

function errorHandler(err, req, res, next){
    res.status(400).json({ Message: "Woah man, take it easy. There's an error!"})
}

function actionProjectCheck(req,res,next){
    projects.get(req.body.project_id)
    .then(project => {
        if(project) {
            next();
        } else {
            res.status(404).json({ message: "Project doesn't exist"})
        }
    })
}

function validateProjectExists(req, res, next) {
    projects.get(req.params.id)
    .then( project => {
        if (project) {
            req.project = project
            next(); 
          } else {
           res.status(404).json({ message: "invalid project id" })
          }
})}

function validateActionExists(req, res, next) {
    actions.get(req.params.id)
    .then( action => {
        if (action) {
            req.action = action
            next(); 
          } else {
           res.status(404).json({ message: "Requested Action does not exist; Please check ID" })
          }
})}

function validateProject(req, res, next) {
    if(req.body.name && req.body.description) {
        next();
    } else {
        res.status(400).json({ messsage: "missing required fields"})
    }; 
}

function validateAction(req, res, next) {
    if(req.body.description && req.body.notes) {
        next();
    } else {
        res.status(400).json({ messsage: "missing required fields"})
    }; 
}

module.exports = {logger, errorHandler, actionProjectCheck, validateActionExists, validateAction, validateProjectExists, validateProject}