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
    }
}