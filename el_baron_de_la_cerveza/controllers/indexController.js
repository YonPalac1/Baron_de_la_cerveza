let { products } = require('../data/dataBase.js');

module.exports = {
	index: (req, res) => {
		let destacadosSlider = products.filter(product => product.destacado === true)
		res.render('index', {
			titleSlider: "Destacados",
			destacadosSlider
		})
	}
}