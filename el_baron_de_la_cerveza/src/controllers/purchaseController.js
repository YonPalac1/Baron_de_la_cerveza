let { products } = require('../data/dataBase')

module.exports = {
	purchase: (req, res) => { 
		let destacadosSlider = products.filter(product => product.destacado === true)
		res.render('finalizePurchase', {
			titleBanner: "Finalizar Compra",
			productCart
		});
	}
}