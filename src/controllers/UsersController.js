const { UsersModel } = require('../models/UsersModel')

class UsersController {
    async create(req, res) {
        const user = new UsersModel(req.body)
        const response = await user.create()

        if(response.constructor == Array) {
            return res.json({
                errors: response
            })
        }

        return res.json(response)
    }
}

module.exports = new UsersController()