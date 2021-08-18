let { products } = require('../data/dataBase')
 
module.exports = {
    detail: (req, res) => {
        let productID = +req.params.id;

        let product = products.find(product => product._id === productID)
		let productCart = products.filter(element => element.cart === true)
        
        res.render('productDetail', {
            titleBanner: "Detalle del Producto",
            titleSlider: "Productos relacionados",
            product,
            productCart
        });
    }
}