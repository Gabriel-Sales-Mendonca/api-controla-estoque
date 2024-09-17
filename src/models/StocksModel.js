const mongoose = require('mongoose')

const Products = require('../models/ProductsModel')

const stocksSchema = new mongoose.Schema({
    idProduct: {
        type: Number,
        required: 'ID é obrigatório'
    },

    amount: {
        type: Number,
        default: 0
    },

    totalValue: {
        type: Number,
        default: 0
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Stock = mongoose.model('Stock', stocksSchema)

class StocksModel {
    constructor(body) {
        this.body = body
        this.errors = []
    }

    valid() {
        if(!this.body.idProduct) this.errors.push('ID não informado')

        if(typeof(this.body.idProduct) !== 'number') this.errors.push('ID precisa ser um número')

        if(typeof(this.body.amount) !== 'number') this.errors.push('AMOUNT precisa ser um número')
    }

    async create() {
        this.valid()

        if(this.errors.length > 0) return this.errors



        return 'coming soon'
    }
}

module.exports = StocksModel