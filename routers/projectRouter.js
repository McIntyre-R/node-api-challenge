const express = require('express');
const projects = require('../data/helpers/projectModel')
const middleware = require('../middleware/middleware')

const router = express.Router()


router.get('/', (req, res, next) => {
    projects.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
       next("failed")
    })
})

router.get('/:id', middleware.validateProjectExists, (req, res, next) => {
    projects.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
})

router.get('/:id/actions', middleware.validateProjectExists, (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
})

router.post('/', middleware.validateProject,(req, res) => {
    projects.insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
})

router.put('/:id', middleware.validateProjectExists, (req, res)=> {
    projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
})

router.delete('/:id', middleware.validateProjectExists,(req,res)=>{
    projects.remove(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
})

module.exports = router