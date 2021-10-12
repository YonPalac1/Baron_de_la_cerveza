let { products, writeProductsJSON, writeUsersJSON } = require('../../data/dataBase')
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
        users.forEach( usuarios => {
            if(usuarios.id === +req.params.id){
               let usersToDestroy = users.indexOf(usuarios);
               users.splice(usersToDestroy, 1)
            }
        })
        writeUsersJSON(users)
        res.redirect('/admin/users')
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
        let product = products.find(product => product.id === +req.params.id);
        res.render("admin/editProduct",{
            product,
            category,
        })
    },
    updateProducts: (req, res) => {
        let errors = validationResult(req)
        
        if(errors.isEmpty()){
            let {
                name, 
                precio, 
                discount,
                marca, 
                category,  
                description,
                destacado,
                graduacion,
            } = req.body;
            
            products.forEach(product => {
                if(product.id === +req.params.id) {
                    product.id = product.id,
                    product.name = name,
                    product.precio = precio,
                    product.discount = discount,
                    product.marca = marca,
                    product.category = category,
                    product.description = description,
                    product.destacado = destacado,
                    product.graduacion = graduacion,
                    product.imagen = req.file ? req.file.filename : product.imagen;
                }
            })

            writeProductsJSON(products)

            res.redirect("/admin/products")
        } else {
            let product = products.find(product => product.id === +req.params.id)

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
        products.forEach( product => {
            if(product.id === +req.params.id){
               let productToDestroy = products.indexOf(product);
               products.splice(productToDestroy, 1)
            }
        })
        
        writeProductsJSON(products)

        res.redirect('/admin/products')
    },

    signin: (req, res)=> {
        res.render('admin/adminLogin')
    }


}