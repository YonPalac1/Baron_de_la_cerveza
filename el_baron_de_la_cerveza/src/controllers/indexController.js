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
	}
}