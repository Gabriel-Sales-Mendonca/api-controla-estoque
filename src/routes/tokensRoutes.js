const { Router } = require('express')

const tokensController = require('../controllers/TokensController')

const route = new Router()

route.post('/', tokensController.create)

module.exports = route