const Purchase = require("../models/Purchase").Purchase
const Person = require("../models/person").Person

module.exports = {
  checkReferer: async (query) => {
    try {
      const purchase = await Purchase.findOne(query).populate({
        path: "Id",
      })
      if (!purchase) {
        throw new Error("Invalid Purchase")
      }
      return purchase
    } catch (err) {
      throw new Error(err)
    }
  },
  checkPerson: async (query) => {
    try {
      const person = await Person.findOne(query)
      if (!person) {
        throw new Error("Invalid Person")
      }
      return person
    } catch (err) {
      throw new Error(err)
    }
  }
}