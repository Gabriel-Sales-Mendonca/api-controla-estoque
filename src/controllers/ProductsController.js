const ProductsModel = require('../models/ProductsModel')

class ProductsController {
    async create(req, res) {
        const product = new ProductsModel(req.body)
        let productCreated = await product.create()

        return res.json(productCreated)
    }

    async index(req, res) {
        const products = await ProductsModel.index()

        return res.json(products)
    }

    async show(req, res) {
        const response = await ProductsModel.show(req.params.id)

        return res.json(response)
    }

    async update(req, res) {
        const product = new ProductsModel(req.body)
        const response = await product.update()

        return res.json(response)
    }

    async delete(req, res) {
        const product = new ProductsModel(req.body)
        const response = await product.delete()

        return res.json(response)
    }
}

module.exports = new ProductsController()