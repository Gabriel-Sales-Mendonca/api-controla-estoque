class ExperimentalController {
    async create(req, res, next) {
        req.body = {
            id: 11,
            name: 'padrão',
            email: 'padrao@padrao.com',
            password: 'padrao'
        }

        next()
    }
}

module.exports = new ExperimentalController()