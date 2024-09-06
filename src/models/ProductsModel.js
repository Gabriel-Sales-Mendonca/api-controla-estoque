const mongoose = require('mongoose')
const Counter = require('./CounterModel')

const productsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: 'ID não informado',
        unique: true
    },

    name: {
        type: String,
        required: 'O nome é obrigatório',
        unique: true
    },

    categoryId: {
        type: Number,
        required: 'Categoria não informada',
        default: 0
    },

    price: {
        type: Number,
        default: 0
    }
})

productsSchema.pre('validate', async function(next) {
    if (this.isNew) {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'productId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
    }
    next();
});

const Products = mongoose.model('Products', productsSchema)

class ProductsModel {
    constructor(body) {
        this.body = body,
        this.errors = []
    }

    valid() {
        if(this.body.name) {
            if(typeof(this.body.name) !== 'string') {
                this.body.name = String(this.body.name).trim()
            } else {
                this.body.name = this.body.name.trim()
            }

            if(this.body.name.length < 3 || this.body.name.length > 30) {
                this.errors.push('O NOME deve ter entre 2 e 31 caracteres')
            }
        }

        if(this.body.categoryId) {
            if(typeof(this.body.categoryId) !== 'number') {
                this.errors.push('ID DA CATEGORIA precisa ser um número')
            }

            if(this.body.categoryId < 0) {
                this.errors.push('ID DA CATEGORIA inválido')
            }
        }

        if(this.body.price) {
            if(typeof(this.body.price) !== 'number') {
                this.errors.push('PREÇO precisa ser um número')
            }

            if(this.body.price < 0) {
                this.errors.push('PREÇO inválido')
            }
        }

        return true
    }

    async create() {
        let { name, categoryId } = this.body

        if(!name || !categoryId) {
            this.errors.push('Os campos NOME e ID DA CATEGORIA são obrigatórios')
            return this.errors
        }

        this.valid()

        let productName = await Products.find({name: {$regex: new RegExp(this.body.name, 'i')}}).exec()
        
        if(productName.length !== 0) {
            this.errors.push('Produto já existe')
        }
        
        if(this.errors.length != 0) return this.errors

        try {
            const product = new Products({
                name: this.body.name,
                categoryId: this.body.categoryId,
                price: this.body.price
            })

            const { id, name, categoryId, price } = await product.save()

            return { id, name, categoryId, price }
        } catch(e) {
            console.log('Houve um erro')
            console.log(e)
        }        
    }

    static async index() {
        const products = await Products.find({}, {_id: 0, __v: 0}).sort({ id: 1 })
        return products
    }

    async show(productId) {
        const products = await Products.find({ id: productId }, { _id: 0, __v: 0 }).sort({ id: 1 })
        return products
    }

    async update() {
        const productUpdated = await Products.findOneAndUpdate({ id: this.body.id }, this.body, { new: true, fields: { _id: 0, __v: 0 } })

        if(!productUpdated) {
            this.errors.push('Produto não encontrado')
        }

        this.valid()

        if(this.errors.length !== 0) return this.errors

        return productUpdated
    }

    async delete() {
        const product = await Products.findOne({ id: this.body.id })
        console.log(product)

        if(!product) {
            this.errors.push('Produto não encontrado')
            return this.errors
        }

        await product.deleteOne()

        return 'Produto apagado com sucesso'
    }
}

module.exports = ProductsModel