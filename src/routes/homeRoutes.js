const { Router } = require('express')

const homeController = require('../controllers/HomeController')

const route = new Router()

route.get('/', homeController.index)

module.exports = route