const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcryptjs')

const Counter = require('./CounterModel')

const usersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: 'ID não informado',
        unique: true
    },

    name: {
        type: String,
        required: 'NOME não informado'
    },

    email: {
        type: String,
        required: 'EMAIL não informado',
        unique: true
    },

    password_hash: {
        type: String,
        required: 'SENHA não salva'
    }
})

usersSchema.pre('validate', async function(next) {
    if (this.isNew) {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
    }
    next();
});

const User = mongoose.model('User', usersSchema)

class UsersModel {
    constructor(body) {
        this.body = body
        this.errors = []
    }

    valid() {
        this.body.name = String(this.body.name)
        this.body.password = String(this.body.password)

        if(this.body.name.length < 3 || this.body.name.length > 30) {
            this.errors.push('NOME deve ter entre 2 e 31 caracteres')
        }

        if(!isEmail(this.body.email)) {
            this.errors.push('EMAIL inválido')
        }

        if(this.body.password.length < 5 || this.body.password.length > 64) {
            this.errors.push('A SENHA deve ter entre 4 e 65 caracteres')
        }
    }

    async create() {
        try {
            if(!this.body.name || !this.body.email || !this.body.password) {
                this.errors.push('NOME, EMAIL ou SENHA não informados')
                return this.errors
            }
    
            this.valid()
    
            if(this.errors.length > 0) return this.errors

            const emailExists = await User.find({ email: this.body.email })

            if(emailExists.length > 0) {
                this.errors.push('EMAIL já cadastrado')
                return this.errors
            }
    
            const password_hash = await bcrypt.hash(this.body.password, 10)
    
            const user = new User({
                name: this.body.name,
                email: this.body.email,
                password_hash: password_hash
            })
    
            const { id, name, email } = await user.save()
    
            return { id, name, email }

        } catch(e) {
            return 'Houve um erro ' + e
        }
    }

    static async findByEmail(email) {
        if(!email) return

        const user = await User.findOne({ email: email })

        return user
    }
}

module.exports = UsersModel