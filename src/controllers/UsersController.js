const { UsersModel } = require('../models/UsersModel')

class UsersController {
    async create(req, res) {
        const user = new UsersModel(req.body)
        const response = await user.create()

        return res.json(response)
    }
}

module.exports = new UsersController()