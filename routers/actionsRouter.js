const express = require('express');
const actions = require('../data/helpers/actionModel');
const middleware = require('../middleware/middleware');

const router = express.Router()


router.get('/', (req, res, next) => {
    actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(action => {
        next("failed")
    })
})

router.get('/:id', middleware.validateActionExists,(req, res) => {
    actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
})

router.post('/', middleware.actionProjectCheck, middleware.validateAction, (req, res) => {
    actions.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
})
router.put('/:id', middleware.validateActionExists, (req, res) => {
    actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
})

router.delete('/:id', middleware.validateActionExists, (req, res) => {
    actions.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
})






module.exports = router