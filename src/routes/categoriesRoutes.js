const { Router } = require('express')

const loginRequired = require('../middlewares/loginRequired')
const categoriesController = require('../controllers/CategoriesController')

const route = new Router()

route.post('/', loginRequired, categoriesController.create)
route.put('/', loginRequired, categoriesController.update)
route.delete('/', loginRequired, categoriesController.delete)
route.get('/', loginRequired, categoriesController.index)
route.get('/:id', loginRequired, categoriesController.show)

module.exports = route