const { validationResult } = require('express-validator')
const db = require("../../database/models");

module.exports = {
    admin: (req, res) => {
        db.User.findOne()
        .then((user)=>{
            res.render("admin/admin", {
                user,
                session: req.session
            })
            
        })
        
    },
    users:(req, res) => {
        db.User.findAll()
        .then(user => {
            res.render("admin/users", {
                user,
                session: req.session
            });
        })
    },
    usersDestroy: (req, res) => {
        db.User.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.redirect("/admin/products")
        })
    },
    products: (req, res) => {
        db.Product.findAll()
        .then(product => {
            res.render("admin/adminProducts", {
                product,
                session: req.session
            })
        })
    },
    addProducts: (req, res) => {
        let categoriesPromise = db.Category.findAll();
        let productsPromise = db.Product.findAll();

        Promise.all([categoriesPromise, productsPromise])
        .then(([categories, products]) => {
            res.render("admin/addProduct", {
                categories,
                products,
                session: req.session,
            });
        })
      .catch((err) => console.log(err));
    },
    createProduct: (req, res)=>{
        let errors = validationResult(req);
        if (req.fileValidatorError) {
        let image = {
            param: "image",
            msg: req.fileValidatorError,
        };
        errors.push(image);
        }

        if (errors.isEmpty()) {
        let { 
            name, 
            price, 
            discount, 
            category, 
            description, 
            trademark,
            alcoholContent,
            outstanding
        } = req.body;

        db.Product.create({
            name,
            price,
            discount,
            categoryId: category,
            description,
            alcoholContent,  
            trademark,
            outstanding,         
            images: req.file ? req.file.filename : "img2.png",
        })
        .then(() => {
            db.Category.update({
                category
            })
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
            

        } else {
            res.render("admin/addProduct", {
                categories,
                errors: errors.mapped(),
                old: req.body,
                session: req.session,
            });
        }
    },
    editProducts: (req, res) => {
        /* let editProduct = db.Product.findByPk(req.params.id, {
            include: [{
                association: "trademark",
            }]
        }); */
        let editCategory = db.Category.findAll();

        Promise.all([editProduct, editTrademark, editCategory])
        .then(([product, trademarks, categories]) => {
            //res.send(product, trademarks, categories)
            res.render("admin/editProduct", {
                product,
                categories
            })
        })
    },
    updateProducts: (req, res) => {
        let errors = validationResult(req)
        
        if(errors.isEmpty()){
            let { 
                name, 
                price, 
                discount, 
                category, 
                description, 
                alcoholContent 
            } = req.body;
            
            db.Product.update({
                name,
                price,
                discount,
                category,
                categoryId: category,
                description,
                alcoholContent,     
                images: req.file ? req.file.filename : "img2.png",
            }, {
                where: {
                    id: req.params.id
                }
            })
            /* .then(()=> {
                db.Trademark.update({
                    include: [{
                        
                    }]
                }, {
                    where: {
                        id: 
                    }
                })
            }) */
            .then(()=> {
                res.redirect("/admin/products")
            })
            .catch((err) => console.log(err));
        } else {
            res.render("admin/editProduct", {
                category,
                product,
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }

    },
    productDestroy: (req, res) => {
        db.Product.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.redirect("/admin/products")
        })
    },
    signin: (req, res)=> {
        res.render('admin/adminLogin')
    }
}