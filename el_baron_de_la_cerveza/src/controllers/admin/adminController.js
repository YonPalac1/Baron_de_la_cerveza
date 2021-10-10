const db = require("../../database/models");
const { validationResult } = require("express-validator");


module.exports = {
    admin: (req, res) => {
        res.render("admin/admin")
    },
    users:(req, res) => {
        res.render("admin/users", {
            users
        });
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
        res.render('admin/adminProducts', {
            products
        });
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
        let errors = validationResult(req)
        if (req.fileValidatorError) {
            let image = {
              param: "image",
              msg: req.fileValidatorError,
            };
            errors.push(image);
        }
        
        if(errors.isEmpty()){

            let arrayImages = [];
            if (req.files) {
                req.files.forEach((image) => {
                arrayImages.push(image.filename);
                });
            }

            let { 
                name, 
                price, 
                discount, 
                category, 
                outstanding,
                trademark, 
                description 
            } = req.body;

            db.Product.create({
                name, 
                price, 
                discount, 
                category, 
                outstanding,
                trademarkId: trademark, 
                description 
            })
            .then(product => {
                if(arrayImages.length > 0){
                    let images = arrayImages.map(image => {
                        return {
                            image: image,
                            productId: product.id
                        }
                    })
                    db.ProductImage.bulkCreate(images)
                        .then(() => res.redirect('/admin/products'))
                        .catch(err => console.log(err))
                }
            })
        }else{
            res.render("admin/addProduct", {
                category, 
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
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