class HomeController {
    index(req, res) {
        return res.json('Hello world!')
    }
}

module.exports = new HomeController()