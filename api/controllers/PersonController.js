const database = require('../models')

class PersonController {
  static async getAllPerson(req, res) {
    try {
      const allPerson = await database.Person.findAll()
      return res.status(200).json(allPerson)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getPersonById(req, res) {
    const { id } = req.params
    try {
      const person = await database.Person.findOne({
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(person)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getByPersonCode(req, res) {
    const { id } = req.params.id;
    try {
      const person = await database.Person.findOne({
        where: {
          person_code: Number(id)
        }
      })
      return res.status(200).json(person)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async createPerson(req, res) {
    const newPerson = req.body
    try {
      const newPersonCreated = await database.Person.create(newPerson)
      return res.status(200).json(newPersonCreated)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async putPerson(req, res) {
    const { id } = req.params
    const newInfo = req.body
    try {
      await database.Person.update(newInfo, { where: { id: Number(id) } })
      const updatedPerson = await database.Person.findOne({ where: { id: Number(id) } })
      return res.status(200).json(updatedPerson)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deletePerson(req, res) {
    const { id } = req.params
    try {
      await database.Person.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `person ${id} deleted` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PersonController