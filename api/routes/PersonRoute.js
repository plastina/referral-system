const { Router } = require('express')
const PersonController = require('../controllers/person-controller.js')

const router = Router()
router
    .get('/person', PersonController.getAllPerson)
    .get('/person/:id', PersonController.getByPersonId)
    .post('/person', PersonController.createPerson)

module.exports = router