const database = require('../models')
const generateIndicationCode = require('../services/generate_indication_code')

class PurchaseController {
  static async getAllPurchases(req, res) {
    try {
      const allPurchases = await database.Purchase.findAll()
      return res.status(200).json(allPurchases)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getPurchaseById(req, res) {
    const { id } = req.params

    try {
      const getPurchaseById = await database.Purchase.findOne({
        where: {
          id: Number(id)
        }
      })
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


    try {
      const personExists = await database.Person.findOne({
        where: {
          person_name: purchase.person_name
        }
      })
      if (personExists) {
        const newPurchaseCreated = await database.Purchase.create({
          product_name: purchase.product_name,
          indication_code: purchase.indication_code,
          person_id: personExists.id,
        })
        return res.status(200).json(
          {
            person_name: personExists.person_name,
            indication_code: personExists.indication_code,
            product_name: newPurchaseCreated.product_name,
            dtBuy: newPurchaseCreated.createdAt,
          }
        )
      } else {
        const newPerson = await database.Person.create({
          person_name: purchase.person_name,
          points: 0,
          indication_code: generateIndicationCode(),
        })
        const newPurchaseCreated = await database.Purchase.create({
          product_name: purchase.product_name,
          indication_code: purchase.indication_code,
          person_id: newPerson.id,
        })
        return res.status(200).json({
          person_name: newPerson.person_name,
          indication_code: newPerson.indication_code,
          product_name: newPurchaseCreated.product_name,
          dtBuy: newPurchaseCreated.createdAt,
        })
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async updatedPurchase(req, res) {
    const { id } = req.params
    const newInfos = req.body
    try {
      await database.Purchase.update(newInfos, { where: { id: Number(id) } })
      const updatedPurchase = await database.Purchase.findOne({ where: { id: Number(id) } })
      return res.status(200).json(updatedPurchase)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deletePurchase(req, res) {
    const { id } = req.params
    try {
      await database.Purchase.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PurchaseController