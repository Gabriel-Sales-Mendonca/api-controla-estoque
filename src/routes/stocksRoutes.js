const { Router } = require('express')

const stocksController = require('../controllers/StocksController')

const route = new Router()

route.post('/', stocksController.create)

module.exports = route