let { products } = require('../data/dataBase.js');

module.exports = {
	index: (req, res) => {
		let destacadosSlider = products.filter(product => product.destacado === true)
		let productCart = products.filter(element => element.cart === true)
		
		res.render('index', {
			titleSlider: "Destacados",
			destacadosSlider,
			productCart
		})
	},
	about: (req, res) => {
		let productCart = products.filter(element => element.cart === true)

        res.render("about", {
            titleBanner: "Acerca de Nosotros",
        	productCart
        })
    },
    contact: (req, res) => {
		let productCart = products.filter(element => element.cart === true)
        
        res.render("contact", {
            titleBanner: "Contáctenos",
            productCart
        })
    },
    finalizePurchase: (req, res) => {
		let destacadosSlider = products.filter(product => product.destacado === true)
		res.render('finalizePurchase', {
			titleBanner: "Finalizar Compra",
			productCart
		});
    }
}