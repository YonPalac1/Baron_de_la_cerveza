const db = require('../database/models');
const { Op } = require('sequelize');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
	index: (req, res) => {
		db.Product.findAll({
            include: [{
                association: "category"
            }]
        })
        .then(product => {
            db.Product.findAll({
                where: {
                    outstanding: 1 
                }
            }) 
            .then(products => {
                res.render("index", {
                    titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                    titleSlider: "Destacados",
                    product,
                    destacadosSlider: products,
                    session: req.session
                })
            })
	    })
    },
	about: (req, res) => {
        res.render("about", {
            titleBanner: "Acerca de Nosotros",
			session: req.session
        })
    },
    contact: (req, res) => {
        
        res.render("contact", {
            titleBanner: "Contáctenos",
			session: req.session
        })
    },
    finalizePurchase: (req, res) => {
		res.render('finalizePurchase', {
			titleBanner: "Último paso",
			session: req.session
		});
    },
	search: (req, res) => {
		db.Product.findAll({
            include: [{
                association: "category"
            }],
			where: {
				name: {
					[Op.like] : `%${req.query.keywords}%`
				}
			}
		})
		.then(result => {
			res.render('results', {
				titleBanner: "Resultados de la busqueda",
				result: result,
				toThousand,
				search: req.query.keywords,
				session: req.session
			})
		})
	}
}