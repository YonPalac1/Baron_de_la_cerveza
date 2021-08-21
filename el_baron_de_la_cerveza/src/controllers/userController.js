let { products } = require('../data/dataBase.js');

module.exports = {
	user: (req, res) => {
		let productCart = products.filter(element => element.cart === true)
		
		res.render('user', {
			titleBanner: "Configuración de frescura",
			productCart
		})
	},
	login: (req, res) => {
		let productCart = products.filter(element => element.cart === true)
		res.render('login', {
			productCart
		});
	}
}