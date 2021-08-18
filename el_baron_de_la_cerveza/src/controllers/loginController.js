let { products } = require('../data/dataBase')

module.exports = {
	login: (req, res) => { 
        let productCart = products.filter(element => element.cart === true)
		res.render('login', {
			productCart
		});
	}
}