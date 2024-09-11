require('dotenv').config()

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const tokensSchema = mongoose.Schema({
    token: String
})

const Token = mongoose.model('Token', tokensSchema)

class TokensModel {
    constructor(body) {
        this.body = body
        this.errors = []
    }

    async create() {
        const token = jwt.sign({ id: this.body.id, email: this.body.email }, process.env.PRIVATEKEY)
        
        return token
    }
}

module.exports = TokensModel