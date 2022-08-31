const database = require('../models')
const generateIndicationCode = require('../services/generate-string.js')

class PersonRepository {
    static async findAll() {
        return await database.Person.findAll();
    }

    static async getById(id) {
        return await database.Person.findOne({
            where: {
                id: Number(id)
            }
        })
    }

    static async getByName(name) {
        return await database.Person.findOne({
            where: {
                person_name: name
            }
        })
    }
    static async getByIndicationCode(code) {
        return await database.Person.findOne({
            where: {
                indication_code: code
            }
        })
    }

    static async updatePointsByIndicationCode(code, points) {
        await database.Person.update({
            points: points
        }, {
            where: {
                indication_code: code
            }
        })
    }

    static async verifyNameExists(name) {
        var person = await this.getByName(name);
        if (person == null) return false;
        else return true;
    }

    static async createNewPerson(name) {
        return await database.Person.create({
            person_name: name,
            indication_code: generateIndicationCode(),
            points: 0
        })
    }
}

module.exports = PersonRepository