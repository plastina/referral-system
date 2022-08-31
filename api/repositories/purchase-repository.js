const database = require('../models')
const generateIndicationCode = require('../services/generate-string.js')

class PurchaseRepository {
    static async findAll() {
        return await database.Purchase.findAll();
    }

    static async getById(id) {
        return await database.Purchase.findOne({
            where: {
                id: Number(id)
            }
        })
    }

    static async verifyNameExists(name) {
        var person = await this.getByName(name);
        if (person == null) return false;
        else return true;
    }

    static async createNewPurchase(productName, indicationCode, personId) {
        return await database.Purchase.create({
            product_name: productName,
            indication_code: indicationCode,
            person_id: personId,
        })
    }
}

module.exports = PurchaseRepository