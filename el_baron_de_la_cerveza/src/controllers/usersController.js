let { validationResult } = require('express-validator')
let bcrypt = require('bcryptjs')
const db = require('../database/models')
const Op = require('sequelize');		

module.exports = {
    // Reenderizo vista de usuario
	user: (req, res) => {
        db.User.findByPk(req.session.user.id, {
            include: [{
                association: "avatars"
            }, {
                association: "contacts"  
            }]
        })
        .then(user => {
            res.render('user', {
                titleBanner: "Perfil de frescura",
                session: req.session,
                user
            })
        })
	},
    // Reenderizo vista de login
	login: (req, res) => {
		res.render('login', {
			session: req.session
		});
	},
	processLogin: (req, res) => {
        let errors = validationResult(req)
        
        if (errors.isEmpty()) {
            db.User.findOne({
                where: {
                    email: req.body.email,
                },
            }).then((user) => {
                req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                pass: user.pass,
                rol: user.rol,
            };
                if (req.body.remember) {
                    res.cookie("elBaronDeLaCerveza", req.session.user, {
                        expires: new Date(Date.now() + 900000),
                        httpOnly: true,
                    });
                }    
                res.locals.user = req.session.user;
                res.redirect("/");
            });
            
        } else {
            res.render("login", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session,
            });
        }
    },
    // Cerrar sesion de usuario
    logout: (req, res) => {
        req.session.destroy()
        if(req.cookies.elBaronDeLaCerveza){
            res.cookie('elBaronDeLaCerveza', '', {maxAge: -1})
        }

        res.redirect('/')
    },
    // Registro de usuario
	register: (req, res) => {
		res.render('register', {
            session: req.session
		});
	},
    // Proceso de registro
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (req.fileValidatorError) {
            let image = {
                param: "image",
                msg: req.fileValidatorError,
            };
            errors.push(image);
        }
        if (errors.isEmpty()) {
            let { name, email, pass1 } = req.body;
            db.User.create({
                name,
                email,
                pass: bcrypt.hashSync(pass1, 12),
                rol: 0,
                bannerOk: 0,
            })
            .then(user => {
                db.Contact.create({
                    street: null,
                    city: null,
                    province: null,
                    phone: null,
                    userId: user.id
                })
                .then(()=>{
                    db.Avatar.create({
                        avatar: "avatar-default.png",
                        userId: user.id
                    })
                    .then(() => {
                        res.redirect('/users')
                    })
                })
            })
            .catch((err) => console.log(err));
        } else {
            res.render("register", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session,
            });
        }
    },

    // Editar datos de usuario
    userEdit: (req, res) => {
        db.User.findByPk(req.session.user.id, {
            include: [{
                association: "avatars"
            }, {
                association: "contacts"  
            }]
          }).then((user) => {
            res.render("userProfileEdit", {
              titleBanner: "Editar perfil", 
              user,
              session: req.session,
            });
        });
    },
    updateUser: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

        let {
            name, 
            email,
            phone, 
            street, 
            province,
            city,
        } = req.body;

        db.User.update({
            name,
            email,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            db.Contact.update({
                street,
                city,
                province,
                phone,
            }, {
                where: {
                    userId: req.params.id
                }
            })
            .then(()=>{
                db.Avatar.update({
                    avatar:  req.file ? req.file.filename : req.session.user.avatar
                }, {
                    where: {
                        userId: req.params.id
                    }
                })
                .then(()=>{
                    res.redirect("/users")
                })
            })
        })
        } else {
        res.render("userProfileEdit", {
            errors: errors.mapped(),
            old: req.body,
            session: req.session,
        });
        }
    },
    // Vista editar contraseña
    passwordEdit: (req, res) => {
        db.User.findByPk(req.session.user.id, {
            include: [{
                association: "avatars"
            }, {
                association: "contacts"  
            }]
          }).then((user) => {
            res.render("editPassword", {
              titleBanner: "Editar contraseña", 
              user,
              session: req.session,
            });
        })
    },
    passwordUpdate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let {
                pass1,
            } = req.body;

            db.User.update({
                pass: bcrypt.hashSync(pass1, 12),
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(()=>{
                res.redirect("/users")
            })
        } else {
            console.log(errors),
            db.User.findByPk(req.session.user.id, {
                include: [{
                    association: "avatars"
                }, {
                    association: "contacts"  
                }]
              }).then((user) => {
                res.render("editPassword", {
                  titleBanner: "Editar contraseña", 
                  user,
                  session: req.session,
                });
            })
        }
    },
    productCart: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then((product)=>{
            res.render('productCart',{
                titleBanner: "Carrito",
                product,
                session: req.session,
            })

        })
    },

    // Login y registro con google
    loginGoogle: (req, res) => {
        req.session.user = {
          id: req.session.passport.user.id,
          name: req.session.passport.user.name,
          rol: req.session.passport.user.rol,
          email: req.session.passport.user.email,
          googleId: req.session.passport.user.social_id,
        }

        res.redirect("/")
        
    }
}