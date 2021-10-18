const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    products: (req, res) => {
        db.Product.findAll({
            include: [
                {association: "category"}
            ]
        })
        .then(product => {
            db.Product.findAll({
                where: {
                    outstanding: 1
                }
            })
            .then(products => {
                res.render("products", {
                    titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                    titleSlider: "Destacados",
                    product,
                    destacadosSlider: products,
                    session: req.session
                })
            })
        })

    },
    detail: (req, res) => {
        db.Product.findOne({
            where: {
              id: req.params.id,
            },
            include: [
                {association: "category"}
            ]
          })
          .then((product) => {
                res.render("productDetail", {
                titleBanner: "Detalles del producto",
                product,
                session: req.session,
            });
        })
            .catch((err) => console.log(err));
    },
    productCart: (req, res) => {
        res.render("productCart", {
            titleBanner: "Comprala antes de que se caliente",
			session: req.session
        })
    },
    orderBy: (req, res)=> {
        if(req.params.id == "desc"){
            db.Product.findAll({
                include: [
                    {association: "category"}
                ],
                order: [['price', 'DESC']]
            })
            .then(product => {
                db.Product.findAll({
                    where: {
                        outstanding: 1
                    },
                })
                .then(products => {
                    res.render("products", {
                        titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                        titleSlider: "Destacados",
                        product,
                        destacadosSlider: products,
                        session: req.session
                    })
                })
            })
        }else if(req.params.id == "asc"){
            db.Product.findAll({
                include: [
                    {association: "category"}
                ],
                order: [['price', 'ASC']]
            })
            .then(product => {
                db.Product.findAll({
                    where: {
                        outstanding: 1
                    },
                })
                .then(products => {
                    res.render("products", {
                        titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                        titleSlider: "Destacados",
                        product,
                        destacadosSlider: products,
                        session: req.session
                    })
                })
            })
        }else  if(req.params.id == "discount"){
            db.Product.findAll({
                include: [
                    {association: "category"}
                ],
                order: [['discount', 'DESC']],
            })
            .then(product => {
                db.Product.findAll({
                    where: {
                        outstanding: 1
                    }
                })
                .then(products => {
                    res.render("products", {
                        titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                        titleSlider: "Destacados",
                        product,
                        destacadosSlider: products,
                        session: req.session
                    })
                })
            })
        }
    }
}