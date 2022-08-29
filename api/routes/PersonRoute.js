const { Router } = require('express')
const PersonController = require('../controllers/PersonController.js')

const router = Router()
router
    .get('/person', PersonController.getAllPerson)
    .get('/person/:id', PersonController.getPersonById)
    .get('/person/code/:id', PersonController.getByPersonCode)
    .post('/person', PersonController.createPerson)
    .put('/person/:id', PersonController.putPerson)
    .delete('/person/:id', PersonController.deletePerson)

module.exports = router