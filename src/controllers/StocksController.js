const StocksModel = require('../models/StocksModel')

class StocksController {
    async create(req, res) {
        const stock = new StocksModel(req.body)
        const response = await stock.create()

        return res.json(response)
    }
}

module.exports = new StocksController()