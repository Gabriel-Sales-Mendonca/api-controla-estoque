const ProductsModel = require('../models/ProductsModel')

class ProductsController {
    async create(req, res) {
        try {
            const product = new ProductsModel(req.body)
            let productCreated = await product.create()
    
            return res.json(productCreated)
        } catch(e) {
            return 'Houve um erro' + e
        }
    }

    async index(req, res) {
        try {
            const products = await ProductsModel.index()
    
            return res.json(products)
        } catch(e) {
            return 'Houve um erro' + e
        }
    }

    async show(req, res) {
        try {            
            const products = new ProductsModel()
            const response = await products.show(req.params.id)
    
            return res.json(response)
        } catch(e) {
            return 'Houve um erro' + e
        }
    }

    async update(req, res) {
        try {
            const product = new ProductsModel(req.body)
            const response = await product.update()
    
            return res.json(response)
        } catch(e) {
            return 'Houve um erro' + e
        }
    }

    async delete(req, res) {
        try {
            const product = new ProductsModel(req.body)
            const response = await product.delete()
    
            return res.json(response)
        } catch(e) {
            return 'Houve um erro' + e
        }
    }
}

module.exports = new ProductsController()