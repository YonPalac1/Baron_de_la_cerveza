const { products } = require("../data/dataBase")

module.exports = {
    products: (req, res) => {
        let destacadosSlider = products.filter(product => product.destacado === true)
        res.render("products", {
            products,
            destacadosSlider,
        })
    }
}