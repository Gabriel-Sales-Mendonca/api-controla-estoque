const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')

const UsersModel = require('../models/UsersModel')
const TokensModel = require('../models/TokensModel')

class TokensController {
    async create(req, res) {
        const userIsValid = new UsersModel(req.body)
        userIsValid.valid()

        if(userIsValid.errors.length > 0) return res.json(userIsValid.errors)

        const user = await UsersModel.findByEmail(req.body.email)

        if(!user) return res.json('Usuário não encontrado')

        const passwordIsValid = await bcrypt.compare(req.body.password, user.password_hash)

        if(!passwordIsValid) return res.status(401).json('Senha incorreta')

        req.body.id = user.id

        const token = new TokensModel(req.body)
        const tokenCreated = await token.create()

        return res.status(200).json({
            token: tokenCreated,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    }
}

module.exports = new TokensController()