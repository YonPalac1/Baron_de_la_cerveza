const { products } = require("../data/dataBase")

module.exports = {
    products: (req, res) => {
        let destacadosSlider = products.filter(product => product.destacado === true)
        let productCart = products.filter(element => element.cart === true)
        res.render("products", {
            titleBanner: "Pedi tu birra y te la llevamos a tu casa",
            titleSlider: "Destacados",
            products,
            destacadosSlider,
            productCart
        })
    },
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
    },
    productCart: (req, res) => {
        let productCart = products.filter(element => element.cart === true)

        res.render("productCart", {
            titleBanner: "Comprala antes de que se caliente",
            productCart
        })
    }
}