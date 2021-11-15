const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    products: (req, res) => {
        db.Product.findAll({
            include: [
                {association: "category"},
                {association: "brand"}
            ]
        })
        .then(product => {
            db.Product.findAll({
                include: [{
                    association: "brand"
                }],
                where: {
                    outstanding: 1 
                }                
            })
            .then(products => {
                let categoryPromise = db.Category.findAll()
                let brandPromise = db.Brand.findAll()
                let bannerPromise = db.Banner.findAll()

                Promise.all([categoryPromise, brandPromise, bannerPromise])
                .then(([categories, brands, banners]) => {
                    res.render("products", {
                        titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                        titleSlider: "Destacados",
                        product,
                        categories,
                        banners,
                        brands,
                        destacadosSlider: products,
                        session: req.session
                    })
                })
            })
        })

    },
    filter: (req, res) => {
        db.Product.findAll({
            where: {
                categoryId: req.params.id,
            },
            include: [
                {association: "category"},
                {association: "brand"}
            ]
        })
        .then((product) => {
            db.Product.findAll({
                include: [{
                    association: "brand"
                }],
                where: {
                    outstanding: 1
                }
            })
            .then(products => {
                let categoryPromise = db.Category.findAll()
                let brandPromise = db.Brand.findAll()

                Promise.all([categoryPromise, brandPromise])
                .then(([categories, brands]) => {
                    res.render("productsFilter", {
                        titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                        titleSlider: "Destacados",
                        product,
                        categories,
                        brands,
                        destacadosSlider: products,
                        session: req.session
                    })
                })
            })
        })
    },
    brandFilter: (req, res) => {
        db.Product.findAll({
            where: {
                brandId: req.params.id,
            },
            include: [
                {association: "category"},
                {association: "brand"}
            ]
        })
        .then((product) => {
            db.Product.findAll({
                include: [{
                    association: "brand"
                }],
                where: {
                    outstanding: 1
                }
            })
            .then(products => {
                let categoryPromise = db.Category.findAll()
                let brandPromise = db.Brand.findAll()

                Promise.all([categoryPromise, brandPromise])
                .then(([categories, brands]) => {
                    res.render("productsFilter", {
                        titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                        titleSlider: "Destacados",
                        product,
                        categories,
                        brands,
                        destacadosSlider: products,
                        session: req.session
                    })
                })
            })
        })
    },
    detail: (req, res) => {
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
            db.Product.findAll({
                limit: 5,
                include: [{
                    association: "brand"
                }],
                where: {
                    outstanding: 1 
                }                
            })
            .then(product => {
                let categoryPromise = db.Category.findAll()
                let brandPromise = db.Brand.findAll()
                let bannerPromise = db.Banner.findAll()

                Promise.all([categoryPromise, brandPromise, bannerPromise])
                .then(([categories, brands, banners]) => {
                    res.render("productDetail", {
                        titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                        titleSlider: "Recomendados",
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
    
    orderBy: (req, res)=> {
        if(req.params.id == "desc"){
            db.Product.findAll({
                include: [
                    {association: "category"},
                    {association: "brand"}
                ],
                order: [['price', 'DESC']]
            })
            .then(product => {
                db.Product.findAll({
                    include: [{
                        association: "brand"
                    }],
                    where: {
                        outstanding: 1
                    }
                })
                .then(products => {
                    let categoryPromise = db.Category.findAll()
                    let brandPromise = db.Brand.findAll()
    
                    Promise.all([categoryPromise, brandPromise])
                    .then(([categories, brands]) => {
                        res.render("productsFilter", {
                            titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                            titleSlider: "Destacados",
                            product,
                            categories,
                            brands,
                            destacadosSlider: products,
                            session: req.session
                        })
                    })  
                })
            })
        }else if(req.params.id == "asc"){
            db.Product.findAll({
                include: [
                    {association: "category"},
                    {association: "brand"}
                ],
                order: [['price', 'ASC']]
            })
            .then(product => {
                db.Product.findAll({
                    include: [{
                        association: "brand"
                    }],
                    where: {
                        outstanding: 1
                    }
                })
                .then(products => {
                    let categoryPromise = db.Category.findAll()
                    let brandPromise = db.Brand.findAll()

                    Promise.all([categoryPromise, brandPromise])
                    .then(([categories, brands]) => {
                        res.render("productsFilter", {
                            titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                            titleSlider: "Destacados",
                            product,
                            categories,
                            brands,
                            destacadosSlider: products,
                            session: req.session
                        })
                    })
                })
            })
        }else  if(req.params.id == "discount"){
            db.Product.findAll({
                include: [
                    {association: "category"},
                    {association: "brand"}
                ],
                order: [['discount', 'DESC']],
            })
            .then(product => {
                db.Product.findAll({
                    include: [{
                        association: "brand"
                    }],
                    where: {
                        outstanding: 1
                    }
                })
                .then(products => {
                    let categoryPromise = db.Category.findAll()
                    let brandPromise = db.Brand.findAll()

                    Promise.all([categoryPromise, brandPromise])
                    .then(([categories, brands]) => {
                        res.render("productsFilter", {
                            titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                            titleSlider: "Destacados",
                            product,
                            categories,
                            brands,
                            destacadosSlider: products,
                            session: req.session
                        })
                    })
                })
            })
        }
    }
}