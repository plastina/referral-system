const database = require('../models')
const personRepository = require('../repositories/person-repository')
const generateIndicationCode = require('../services/generate-string.js')

class PersonController {
  static async getAllPerson(req, res) {
    try {
      const allPerson = await personRepository.findAll()
      return res.status(200).json(allPerson.map((x) => (
        {
          person_code: x.id,
          person_name: x.person_name,
          points: x.points
        })))
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getByPersonId(req, res) {
    const id = req.params.id;
    try {
      if (id != null) {
        const person = await personRepository.getById(id)
        var purchases = await database.Purchase.findAll({
          where: {
            indication_code: person.indication_code
          }
        })

        return res.status(200).json({
          person_name: person.person_name,
          indications: purchases.map((x) => ({
            person_code: x.person_id,
            product_name: x.product_name,
            indication_code: x.indication_code,
            dtBuy: x.createdAt
          }))
        })
      }
      else throw new Error('Person code is invalid.' + id)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async createPerson(req, res) {
    const newPerson = req.body
    var newPersonCreated;
    try {
      if (newPerson.person_name == null) throw new Error('Person name is invalid or empty.')
      var personExists = await personRepository.verifyNameExists(newPerson.person_name)
      if (personExists) throw new Error('Already has someone with this name.')
      else newPersonCreated = await personRepository.createNewPerson(newPerson.person_name)

      if (newPersonCreated) return res.status(200).json(newPersonCreated)
      else throw new Error(newPerson)

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PersonController