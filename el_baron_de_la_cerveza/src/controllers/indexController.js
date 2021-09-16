let { products } = require('../data/dataBase.js');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let productCart = products.filter(element => element.cart === true)

module.exports = {
	index: (req, res) => {
		let destacadosSlider = products.filter(product => product.destacado === "on")
		
		res.render('index', {
			titleSlider: "Destacados",
			destacadosSlider,
			productCart,
			session: req.session
		})
	},
	about: (req, res) => {
        res.render("about", {
            titleBanner: "Acerca de Nosotros",
        	productCart,
			session: req.session
        })
    },
    contact: (req, res) => {
        
        res.render("contact", {
            titleBanner: "Contáctenos",
            productCart,
			session: req.session
        })
    },
    finalizePurchase: (req, res) => {
		res.render('finalizePurchase', {
			titleBanner: "Finalizar Compra",
			productCart,
			session: req.session
		});
    },
    search: (req, res) => {

		let result = []
		products.forEach(product => {
			if(product.name.toLowerCase().includes(req.query.keywords.toLowerCase())){
				result.push(product)
			}
		})
		res.render('results', {
			result,
			toThousand,
			productCart,
			search: req.query.keywords,
			session: req.session
		})
	},
}