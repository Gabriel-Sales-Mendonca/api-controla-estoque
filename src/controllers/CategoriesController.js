const CategoriesModel = require('../models/CategoriesModel')

class CategoriesController {
    async create(req, res) {
        const category = new CategoriesModel(req.body)
        const response = await category.create()

        return res.json(response)
    }

    async index(req, res) {
        const response = await CategoriesModel.index()

        return res.json(response)
    }

    async show(req, res) {
        try {
            const response = await CategoriesModel.show(req.params.id)

            return res.status(200).json(response)
        } catch(e) {
            return 'Houve um erro' + e
        }
    }

    async update(req, res) {
        try {
            const categorie = new CategoriesModel(req.body)
            const response = await categorie.update()

            return res.status(200).json(response)
        } catch(e) {
            return 'Houve um erro' + e
        }
    }
}

module.exports = new CategoriesController()