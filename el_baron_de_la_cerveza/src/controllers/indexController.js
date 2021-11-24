const db = require('../database/models');
const { Op } = require('sequelize');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
	index: (req, res) => {
		db.Product.findAll({
            include: [{
                association: "category"
            },{
                association: "brand"
            }]
        })
        .then(product => {
            db.Product.findAll({
                include: [{
                    association: "brand"
                }],
                where: {
                    outstanding: 1 
                },
            }) 
            .then(products => {
                db.Brand.findAll()
                .then(brands =>{
                    res.render("index", {
                        titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                        titleSlider: "Destacados",
                        product,
                        brands,
                        destacadosSlider: products,
                        session: req.session
                    })
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
        db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {association: "category"},
                {association: "brand"}
            ]
        })
        .then(productDetail => {
            db.Product.findByPk(req.params.id)
            .then(product => {
                let categoryPromise = db.Category.findAll()
                let brandPromise = db.Brand.findAll()
                let bannerPromise = db.Banner.findAll()

                Promise.all([categoryPromise, brandPromise, bannerPromise])
                .then(([categories, brands, banners]) => {
                    res.render("finalizePurchase", {
                        titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                        productDetail,
                        categories,
                        banners,
                        brands,
                        product,
                        session: req.session
                    })
                })
            })
        })

    },
	search: (req, res) => {
		db.Product.findAll({
            include: [{
                association: "category"
            },{
                association: "brand"
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