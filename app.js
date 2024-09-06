require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const homeRoutes = require('./src/routes/homeRoutes')
const productsRoutes = require('./src/routes/productsRoutes')
const categoriesRoutes = require('./src/routes/categoriesRoutes')

async function main() {
    try {
        await mongoose.connect(process.env.CONNECTIONSTRING);
        console.log('Conectado ao Banco de Dados')
    } catch(e) {
        console.log('Houve um erro')
    }
}
main()

class App {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.use('/', homeRoutes)
        this.app.use('/categories', categoriesRoutes)
        this.app.use('/products', productsRoutes)
        //this.app.use('/stock')
    }
}

module.exports = new App().app