require('dotenv').config()

const jwt = require('jsonwebtoken')

function loginRequired (req, res, next) {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json('Faça login')
    }

    const [ , token ] = authorization.split(' ')

    try {
        const decoded = jwt.verify(token, process.env.PRIVATEKEY)

        const { id, email } = decoded

        req.body.userId = id

        next()
    } catch(e) {
        return res.status(401).json('TOKEN expirado ou inválido')
    }
}

module.exports = loginRequired