const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: 'USERID não informado'
    },

    id: {
        type: Number,
        required: 'ID não informado',
        unique: true
    },

    name: {
        type: String,
        required: 'O nome é obrigatório',
        unique: true
    }
})

const Categories = mongoose.model('Categories', categoriesSchema)

class CategoriesModel {
    constructor(body) {
        this.body = body
        this.errors = []
    }

    valid() {
        if(typeof(this.body.id) !== 'number') {
            this.errors.push('ID precisa ser um número')
        }

        if(this.body.id < 0) {
            this.errors.push('ID inválido')
        }

        if(typeof(this.body.name) !== 'string') {
            this.body.name = String(this.body.name).trim()
        } else {
            this.body.name = this.body.name.trim()
        }

        if(this.body.name.length < 3 || this.body.name.length > 30) {
            this.errors.push('O NOME deve ter entre 2 e 31 caracteres')
        }
    }

    async create() {
        if(!this.body.id || !this.body.name) {
            this.errors.push('ID e NOME são obrigatórios')
            return this.errors
        }

        this.valid()

        if(this.errors.length !== 0) return this.errors

        try {
            const categoryVerify = await Categories.find({
                $or: [{ id: this.body.id }, {name: {$regex: new RegExp(this.body.name, 'i')}}]
            })
    
            if(categoryVerify.length > 0) {
                this.errors.push('Categoria já existe')
                return this.errors
            }
    
            const category = new Categories(this.body)
    
            const { id, name } = await category.save()
    
            return { id, name }
        } catch(e) {
            return 'Houve um erro ' + e
        }
    }

    static async index(userId) {
        try {
            const categories = await Categories.find({userId: userId}, {_id: 0, __v: 0}).sort({ id: 1 })

            return categories
        } catch(e) {
            return 'Houve um erro ' + e
        }         
    }

    static async show(userId, categoryId) {
        try {
            const category = await Categories.find({ userId: userId, id: categoryId }, { _id: 0, __v: 0 })

            if(category.length == 0) {
                return 'Categoria não encontrada'
            }

            return category
        } catch(e) {
            return 'Houve um erro ' + e
        }
    }

    async update() {
        if(!this.body.id || !this.body.name) {
            this.errors.push('ID e NOME são obrigatórios')
            return this.errors
        }

        this.valid()

        if(this.errors.length !== 0) return this.errors

        try {
            const categoryVerify = await Categories.find({ name: new RegExp(this.body.name, 'i') })

            if(categoryVerify.length > 0) {
                this.errors.push('Categoria já cadastrada')
                return this.errors
            }

            const categoryUpdated = await Categories.findOneAndUpdate({ id: this.body.id }, this.body, { new: true, fields: { _id: 0, __v: 0 } })

            if(!categoryUpdated) {
                this.errors.push('Categoria não encontrada')
                return this.errors
            }

            return categoryUpdated
        } catch(e) {
            return 'Houve um erro ' + e
        }
    }

    async delete() {
        try {
            if(!this.body.id) {
                this.errors.push('ID é obrigatório')
                return this.errors
            }

            const category = await Categories.find({ id: this.body.id })

            await Categories.deleteOne({ id: this.body.id })

            return `Categoria ${category[0].name} apagada com sucesso`
        } catch(e) {
            return 'Houve um erro ' + e
        }
    }
}

module.exports = CategoriesModel