let { products } = require('../data/dataBase')

module.exports = {
    config: (req, res) => {
    	let productCart = products.filter(element => element.cart === true)
        res.render("config", {
            titleBanner: "Configuracion de frescura",
            productCart
        })
    }
}