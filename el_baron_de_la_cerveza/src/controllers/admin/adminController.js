const { validationResult } = require('express-validator')
const db = require("../../database/models");

module.exports = {
    admin: (req, res) => {
        res.render("admin/admin")
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
                titleSlider: "Destacados",
                product,
                destacadosSlider: products,
                session: req.session
            })
        })
    },
    addProducts: (req, res) => {
        let categoriesPromise = db.Category.findAll();
    let subcategoriesPromise = db.Trademark.findAll();

    Promise.all([categoriesPromise, subcategoriesPromise])
      .then(([categories, trademarks]) => {
        res.render("admin/addProduct", {
            categories,
            trademarks,
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
            trademark, 
            description, 
            alcoholContent,
            outstanding
        } = req.body;

        db.Product.create({
            name,
            price,
            discount,
            trademarkId: trademark,
            description,
            alcoholContent,  
            outstanding,         
            images: req.file ? req.file.filename : "img2.png",
        })
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
            

        } else {
            res.render("admin/addProduct", {
                subcategories,
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
                association: "trademark",
                include: [{
                    association: "category"
                }]
            }]
        });
        let editTrademark = db.Trademark.findAll();
        let editCategory = db.Category.findAll();

        Promise.all([editProduct, editTrademark, editCategory])
        .then(([product, trademarks, categories]) => {
            res.render("admin/editProduct", {
                product,
                trademarks,
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
                trademark, 
                description, 
                alcoholContent 
            } = req.body;
            
            db.Product.update({
                name,
                price,
                discount,
                category,
                trademarkId: trademark,
                description,
                alcoholContent,           
                images: req.file ? req.file.filename : "img2.png",
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/admin/products");
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