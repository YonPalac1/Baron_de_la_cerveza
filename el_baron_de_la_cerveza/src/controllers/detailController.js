let { products } = require('../data/dataBase')
 
module.exports = {
    detail: (req, res) => {
        let productID = +req.params.id;

        let product = products.find(product => product._id === productID)

        res.render('productDetail', {
            titleBanner: "Detalle del Producto",
            titleSlider: "Productos relacionados",
            product
        });
    }
}