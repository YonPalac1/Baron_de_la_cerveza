let { products } = require('../data/dataBase')

module.exports = {
    about: (req, res) => {
    	let productCart = products.filter(element => element.cart === true)
        res.render("about", {
            titleBanner: "Acerca de Nosotros",
            productCart
        })
    }
} 