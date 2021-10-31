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
            images: req.file ? req.file.filename : "default-img.gif",
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
        let editProduct = db.Product.findByPk(req.params.id, {
            include: [{
                association: "category",
            }]
        }); 
        let editCategory = db.Category.findAll();

        Promise.all([editProduct, editCategory])
        .then(([product, categories]) => {
            //res.send(product, trademarks, categories)
            res.render("admin/editProduct", {
                product,
                categories
            })
        })
    },
    updateProducts: (req, res) => {
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
            outstanding,
        } = req.body;

        let arrayImages;
        if (req.files) {
          req.files.forEach((image) => {
            arrayImages = image.filename
          });
        }

        db.Product.update({
            name,
            price,
            discount,
            categoryId: category,
            description,
            alcoholContent,  
            trademark,
            outstanding,         
            images: arrayImages
        },{
            where: {
                id: req.params.id
           }
        })
        .then(() => {
            db.Category.update({
                category
            },{
                where: {
                    id: req.params.id
                }
            })
            .then((products)=>{
                res.redirect("/admin/products");
            })
        })
        .catch((err) => console.log(err));
            

        } else {
            res.render("admin/editProduct", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session,
            });
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
    },
    addCategory: (req, res)=>{
        
        db.Category.findAll()
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
    addBrand: (req, res)=>{
        
        db.Brand.findAll()
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
                res.redirect("/admin/create/brand");
            })
            .catch((err) => console.log(err));
                    
       } 
    }

}