const { validationResult } = require('express-validator')
const db = require("../../database/models");
const { Op } = require("sequelize");

let bcrypt = require('bcryptjs')

module.exports = {
    admin: (req, res) => {
        let productsPromise = db.Product.findAll()
        let categoryPromise = db.Category.findAll()
        let brandPromise = db.Brand.findAll()
        let userPromise = db.User.findAll()
        let adminPromise = db.User.findAll({
            where: {
                [Op.or]: [
                  { rol: 1 },
                  { rol: 2 }
                ]
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
    // Editar administrador
    userAdmin: (req, res)=>{
        db.User.findOne({
            where: {
                id: req.params.id
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
    // Agregar nuevo administrador
    addAdmin: (req, res) => {
        db.User.findOne({
            where: {
                rol: 1
            }
        })
        .then(user =>{
            res.render("admin/addAdmin", {
                user,
                session: req.session   
            })
        })
    },
    addNewAdmin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let {
                name,
                email,
                pass1,
            } = req.body;

            db.User.create({
                name,
                email,
                pass: bcrypt.hashSync(pass1, 12),
                rol: 2,
                bannerOk: 0,
            })
            .then(()=>{
                res.redirect("/admin/index")
            })
        
        } else {
        console.log(errors),
        db.User.findOne({
            where: {
                rol: 1
            }
        })
        .then(user =>{
            res.render("admin/addAdmin", {
                user,
                session: req.session   
            })
        })
        }
    },
    // Controladores de usuarios
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
        db.Contact.destroy({
            where: {userId: req.params.id}
        })
        db.Avatar.destroy({
            where: {userId: req.params.id}
        })
        db.User.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.redirect("/admin/users")
        })
    },
    // Fin controladores de usuarios

    // Controladores de productos - Crud de productos
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

    // Crear productos
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

    // Editar productos
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
                res.render("admin/editProduct", {
                    product,
                    categories,
                    brands
                })
            })
        }

    },
    // Eliminar productos
    productDestroy: (req, res) => {
        db.Product.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.redirect("/admin/products")
        })
    },
    // Fin de Crud productos

    signin: (req, res)=> {
        res.render('login')
    },

    // Search de usuarios
	search: (req, res) => {
		db.User.findAll({
			where: {
				name: {
					[Op.like] : `%${req.query.keywords}%`
				}
			}
		})
		.then(user => {
			res.render('admin/results', {
				user: user,
				search: req.query.keywords,
				session: req.session
			})
		})
	} 
    
}