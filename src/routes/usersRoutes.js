const { Router } = require('express')

const usersController = require('../controllers/UsersController')

const route = new Router()

route.post('/', usersController.create)

module.exports = route