const { Router } = require('express')

const loginRequired = require('../middlewares/loginRequired')
const productsController = require('../controllers/ProductsController')

const route = new Router()

route.post('/', loginRequired, productsController.create)
route.get('/', productsController.index)
route.get('/:id', productsController.show)
route.put('/', loginRequired, productsController.update)
route.delete('/', loginRequired, productsController.delete)

module.exports = route