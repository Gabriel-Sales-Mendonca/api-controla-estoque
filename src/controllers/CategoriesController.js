const { CategoriesModel } = require('../models/CategoriesModel')

class CategoriesController {
    async create(req, res) {
        const category = new CategoriesModel(req.body)
        const response = await category.create()

        return res.json(response)
    }

    async index(req, res) {
        const response = await CategoriesModel.index(req.body.userId)

        return res.json(response)
    }

    async show(req, res) {
        const response = await CategoriesModel.show(req.body.userId, req.params.id)

        return res.status(200).json(response)
    }

    async update(req, res) {
        const categorie = new CategoriesModel(req.body)
        const response = await categorie.update()

        return res.status(200).json(response)
    }

    async delete(req, res) {
        const category = new CategoriesModel(req.body)
        const response = await category.delete()

        return res.status(200).json(response)
    }
}

module.exports = new CategoriesController()