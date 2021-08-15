const { products } = require("../data/dataBase")

module.exports = {
    productCart: (req, res) => {
        let productCart = products.filter(element => element.cart === true)

        res.render("productCart", {
            titleBanner: "Comprala antes de que se caliente",
            productCart
        })
    }
}