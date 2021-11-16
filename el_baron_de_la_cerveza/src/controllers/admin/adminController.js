const { validationResult } = require('express-validator')
const db = require("../../database/models");

let bcrypt = require('bcryptjs')

module.exports = {
    admin: (req, res) => {
        let productsPromise = db.Product.findAll()
        let categoryPromise = db.Category.findAll()
        let brandPromise = db.Brand.findAll()
        let userPromise = db.User.findAll()
        let adminPromise = db.User.findOne({
            where: {
                rol: 1
            }
        })

        Promise.all([productsPromise,categoryPromise,brandPromise,userPromise,adminPromise])
        .then(([products,categories,brands,users,admin])=>{
            res.render("admin/admin", {
                products,
                categories,
                brands,
                users,
                admin,
                session: req.session
            })
        })
    },
    userAdmin: (req, res)=>{
        db.User.findOne({
            where: {
                rol: 1
            }
        })
        .then(user =>{
            res.render("admin/editAdmin", {
                user,
                session: req.session   
            })
        })
    },
    updateAdmin: (req, res)=>{
        let errors = validationResult(req);

        if (errors.isEmpty()) {

        let {
            name, 
            email,
            pass1,
        } = req.body;

        db.User.update({
            name,
            email,
            pass: bcrypt.hashSync(pass1, 12),
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect("/admin/index")
        })
        
        } else {
        console.log(errors),
        res.render("admin/editAdmin", {
            errors: errors.mapped(),
            old: req.body,
            session: req.session,
        });
        }
    },
    users:(req, res) => {
        db.User.findAll({
            order: [['createdAt', 'DESC']]
        })
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
        let productPromise = db.Product.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {association: "category"},
                {association: "brand"}
            ]
        })
        let brandsPromise = db.Brand.findAll()
        let categoriesPromise = db.Category.findAll()
        
        Promise.all([productPromise,brandsPromise,categoriesPromise])
        .then(([product, brands, categories]) => {
            res.render("admin/adminProducts", {
                product,
                brands,
                categories,
                session: req.session
            })
        })
        
      .catch((err) => console.log(err));
    },
    addProducts: (req, res) => {
        let productsPromise = db.Product.findAll()
        let categoryPromise = db.Category.findAll()
        let brandPromise = db.Brand.findAll()
        

        Promise.all([productsPromise, categoryPromise, brandPromise])
        .then(([products, categories, brands]) => {
            res.render("admin/addProduct", {
                products,
                categories,
                brands,
                session: req.session,
            });
        })
      .catch((err) => console.log(err));
    },
    createProduct: (req, res)=>{
        let errors = validationResult(req);
        if (req.fileValidatorError) {
        let image = {
            param: "images",
            msg: req.fileValidatorError,
        };
        errors.push(image);
        }

        if (!errors.isEmpty()) {

            let arrayImages;
            if (req.files) {
              req.files.forEach((image) => {
                arrayImages = image.filename
              });
            }else{
                arrayImages = "default-img.gif"
            }

        let { 
            name, 
            price, 
            discount, 
            category, 
            description, 
            brand,
            alcoholContent,
            outstanding,
        } = req.body;

        db.Product.create({
            name,
            price,
            discount,
            categoryId: category,
            description,
            alcoholContent,  
            brandId: brand,
            outstanding,   
            images: arrayImages,  
        })
        .then(() => {
            res.redirect("/admin/products")            
        })
        .catch((err) => console.log(err));
            

        } else {
            let productsPromise = db.Product.findAll()
        let categoryPromise = db.Category.findAll()
        let brandPromise = db.Brand.findAll()
        

        Promise.all([productsPromise, categoryPromise, brandPromise])
        .then(([products, categories, brands]) => {
            res.render("admin/addProduct", {
                products,
                categories,
                brands,
                session: req.session,
            });
        })
      .catch((err) => console.log(err));       }
    },
    editProducts: (req, res) => {
        let editProduct = db.Product.findByPk(req.params.id, {
            include: [{
                association: "category",
            },{
                association: "brand",
            }]
        }); 
        let editCategory = db.Category.findAll();
        let editBrand = db.Brand.findAll();

        Promise.all([editProduct, editCategory, editBrand])
        .then(([product, categories, brands]) => {
            //res.send(product, trademarks, categories)
            res.render("admin/editProduct", {
                product,
                categories,
                brands
            })
        })
    },
    updateProducts: (req, res) => {
        let errors = validationResult(req);
        if (req.fileValidatorError) {
            let image = {
                param: "images",
                msg: req.fileValidatorError,
            };
            errors.push(image);
        }

        if (!errors.isEmpty()) {

            let arrayImages;
            if (req.files) {
              req.files.forEach((image) => {
                arrayImages = image.filename
              });
            }
            
        let { 
            name, 
            price, 
            discount, 
            category, 
            description, 
            brand,
            alcoholContent,
            outstanding,
        } = req.body;


        db.Product.update({
            name,
            price,
            discount,
            categoryId: category,
            description,
            alcoholContent,  
            brandId: brand,
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
            .then(()=>{
                db.Brand.update({
                    brand
                },{
                    where: {
                        id: req.params.id
                    }
                })
                res.redirect("/admin/products");
            })
        })
        .catch((err) => console.log(err));
            

        } else {
            let editProduct = db.Product.findByPk(req.params.id, {
                include: [{
                    association: "category",
                },{
                    association: "brand",
                }]
            }); 
            let editCategory = db.Category.findAll();
            let editBrand = db.Brand.findAll();
    
            Promise.all([editProduct, editCategory, editBrand])
            .then(([product, categories, brands]) => {
                //res.send(product, trademarks, categories)
                res.render("admin/editProduct", {
                    product,
                    categories,
                    brands
                })
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
    },
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
            let { 
                category,
            } = req.body;

            db.Category.update({
                category: category
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
    addBanner: (req, res)=>{
        let bannerPromise = db.Banner.findAll()
        let userPromise = db.User.findOne(req.params.rol)

        Promise.all([bannerPromise, userPromise])
        .then(([banners, users]) =>{
            res.render("admin/addBanner", {
                banners,
                users,
                session: req.session,
            })
        })
    },
    createBanner: (req, res)=>{
        let errors = validationResult(req);
        if (req.fileValidatorError) {
        let image = {
            param: "banner",
            msg: req.fileValidatorError,
        };
        errors.push(image);
        }

        if (!errors.isEmpty()) {

            let arrayImages;
            if (req.file) {
                arrayImages = req.file.filename
            }else{
                arrayImages = "default-img.gif"
            }

        let { 
            banner
        } = req.body;

        db.Banner.create({
            banner: arrayImages
        })
        .then(() => {
            res.redirect("/admin/banners/create")            
        })
        .catch((err) => console.log(err));
            
        } else {
            db.Banner.findAll()
            .then((banners) => {
                res.render("admin/addBanner", {
                    banners,
                    session: req.session,
                })
            .catch((err) => console.log(err));
            })
          .catch((err) => console.log(err));   
        }
    },
    bannerDestroy: (req, res)=>{
        db.Banner.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.redirect("/admin/banners/create")
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
    signin: (req, res)=> {
        res.render('admin/adminLogin')
    }
}