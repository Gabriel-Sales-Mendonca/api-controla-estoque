const { Router } = require('express')

const loginRequired = require('../middlewares/loginRequired')
const categoriesController = require('../controllers/CategoriesController')

const route = new Router()

route.post('/', loginRequired, categoriesController.create)
route.get('/', categoriesController.index)
route.get('/:id', categoriesController.show)
route.put('/', loginRequired, categoriesController.update)
route.delete('/', loginRequired, categoriesController.delete)

module.exports = route