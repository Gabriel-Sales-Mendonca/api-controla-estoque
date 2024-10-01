const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { UsersModel } = require('../models/UsersModel')

class TokensController {
    async create(req, res) {
        const userIsValid = new UsersModel(req.body)
        userIsValid.valid()

        if(userIsValid.errors.length > 0) return res.json(userIsValid.errors)

        const user = await UsersModel.findByEmail(req.body.email)

        if(!user) return res.status(401).json({
            error: 'Usuário não encontrado'
        })

        const passwordIsValid = await bcrypt.compare(req.body.password, user.password_hash)

        if(!passwordIsValid) return res.status(401).json({
            error: 'Senha incorreta'
        })

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.PRIVATEKEY, {expiresIn: 60 * 60 * 24 * 7})

        return res.status(200).json({
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    }
}

module.exports = new TokensController()