const database = require('../models')
const purchaseRepository = require('../repositories/purchase-repository')
const personRepository = require('../repositories/person-repository')
const generateIndicationCode = require('../services/generate-string')

class PurchaseController {
  static async getAllPurchases(req, res) {
    try {
      const allPurchases = await purchaseRepository.findAll()
      return res.status(200).json(allPurchases)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getPurchaseById(req, res) {
    const { id } = req.params

    try {
      const getPurchaseById = await purchaseRepository.getById(id)
      return res.status(200).json(getPurchaseById)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async createPurchase(req, res) {
    const purchase = {
      product_name: req.body.product_name,
      indication_code: req.body.indication_code,
      person_name: req.body.person_name,
    }

    var person;
    var indicationCode;

    try {
      if (purchase.indication_code != null) {

        const personIndication = await personRepository.getByIndicationCode(purchase.indication_code)
        if (personIndication == null) throw new Error("Indication code is invalid.")

        const newPoints = personIndication.points + 1

        await personRepository.updatePointsByIndicationCode(purchase.indication_code, newPoints)
      }

      const personExistent = await personRepository.getByName(purchase.person_name)

      if (personExistent) person = personExistent;
      else person = await personRepository.create(purchase.person_name)
      const newPurchaseCreated = await purchaseRepository
        .createNewPurchase(purchase.product_name, purchase.indication_code, person.id)

      return res.status(200).json(
        {
          person_name: person.person_name,
          indication_code: person.indication_code,
          product_name: newPurchaseCreated.product_name,
          dtBuy: newPurchaseCreated.createdAt,
        }
      )
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}

module.exports = PurchaseController