const { validationResult } = require('express-validator')
const db = require("../../database/models");

let bcrypt = require('bcryptjs')

module.exports = {
    addCategory: (req, res)=>{
            
        db.Category.findAll({
            order: [['id', 'DESC']]
        })
        .then((category) => {
            res.render("admin/addCategory", {
                category,
                session: req.session,
            });
        })
    .catch((err) => console.log(err));

    },
    createCategory: (req, res)=>{
        
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let { 
                category,
            } = req.body;

            db.Category.create({
                category
            })
            .then(() => {
                res.redirect("/admin/category/create");
            })
            .catch((err) => console.log(err));
                    
    } 
    },
    categoryDestroy: (req, res)=>{
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Product.update({
                categoryId: 100
            },{
                where:{
                    categoryId: req.params.id
                }
            })

            db.Category.update({
                category : "Sin categoria"
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/admin/category/create");
            })
            .catch((err) => console.log(err));
                    
    } 
    },
    addBrand: (req, res)=>{
        
        db.Brand.findAll({
            order: [['id', 'DESC']]
        })
        .then((brand) => {
            res.render("admin/addBrand", {
                brand,
                session: req.session,
            });
        })
    .catch((err) => console.log(err));

    },
    createBrand: (req, res)=>{
        
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let { 
                brand,
            } = req.body;

            db.Brand.create({
                brand
            })
            .then(() => {
                res.redirect("/admin/brand/create");
            })
            .catch((err) => console.log(err));
                    
    } 
    },
    brandDestroy: (req, res)=>{
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Product.update({
                brandId: 100
            },{
                where:{
                    brandId: req.params.id
                }
            })

            db.Brand.update({
                brand : "Sin marca"
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/admin/brand/create");
            })
            .catch((err) => console.log(err));
                    
        } 
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
                    res.render("admin/products_categories", {
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
    filterBrands: (req,res)=>{
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
                    res.render("admin/products_brands", {
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