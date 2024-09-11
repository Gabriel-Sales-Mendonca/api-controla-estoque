const { Router } = require('express')

const experimentalController = require('../controllers/experimentalController')
const tokensController = require('../controllers/TokensController')

const route = new Router()

route.post('/', experimentalController.create, tokensController.create)

module.exports = route