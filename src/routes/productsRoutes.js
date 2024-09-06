const { Router } = require('express')

const productsController = require('../controllers/ProductsController')

const route = new Router()

route.post('/', productsController.create)
route.get('/', productsController.index)
route.get('/:id', productsController.show)
route.put('/', productsController.update)
route.delete('/', productsController.delete)

module.exports = route