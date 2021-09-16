const { products } = require("../data/dataBase")
const { users } = require("../data/dataBase")

let category = [];
products.forEach(product => {
    if(!category.includes(product.category)){
        category.push(product.category)
    }  
});

let marcas = [];
products.forEach(product => {
    if(!marcas.includes(product.marca)){
        marcas.push(product.marca)
    }  
});


module.exports = {
    products: (req, res) => {
        let destacadosSlider = products.filter(product => product.destacado === "on")
        let productCart = products.filter(element => element.cart === true)
        res.render("products", {
            titleBanner: "Pedi tu birra y te la llevamos a tu casa",
            titleSlider: "Destacados",
            products,
            destacadosSlider,
            productCart,
            category,
            marcas,
			session: req.session
        })
    },
    detail: (req, res) => {
        let productID = +req.params.id;
        let destacadosSlider = products.filter(product => product.destacado === "on")
        let product = products.find(product => product.id === productID)
        let productCart = products.filter(element => element.cart === true)
        
        res.render('productDetail', {
            titleBanner: "Detalle del Producto",
            titleSlider: "Productos relacionados",
            product,
            destacadosSlider,
            productCart,
			session: req.session
        });
    },
    productCart: (req, res) => {
        let productCart = products.filter(element => element.cart === true)

        res.render("productCart", {
            titleBanner: "Comprala antes de que se caliente",
            productCart,
			session: req.session
        })
    }
}