let { products, writeUsersJSON } = require('../data/dataBase.js');
let { validationResult } = require('express-validator')
let bcrypt = require('bcryptjs')
const db = require('../database/models')

const productCart = products.filter(element => element.cart === true)
		

module.exports = {
	user: (req, res) => {
        db.User.findByPk(req.session.user.id, {
            include: [{ association: "contacts" }],
          }).then((user) => {
            res.render("user", {
              titleBanner: "Detalles",
              user,
              session: req.session,
            });
          });
	},
	login: (req, res) => {
		res.render('login', {
			productCart,
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
                phone: user.phone,
                rol: user.rol,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                avatar: user.avatar
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
                session: req.session,
            });
        }
    },
	register: (req, res) => {
		let productCart = products.filter(element => element.cart === true)
		res.render('register', {
			productCart,
            session: req.session
		});
	},
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
            let { name, last_name, email, pass1 } = req.body;
            db.User.create({
                name,
                email,
                pass: bcrypt.hashSync(pass1, 12),
                rol: 0,
            })
            .then(() => {
                res.redirect("/users/login");
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
    userEdit: (req, res) => {
        db.User.findByPk(req.session.user.id, {
            include: [{ association: "contacts" }],
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
            avatar: req.file ? req.file.filename : req.session.user.avatar
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            db.Contact.create({
                street,
                city,
                province,
                phone,
                userId: req.params.id
            })
            .then(() => {
                res.redirect('/users')
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
    logout: (req, res) => {
        req.session.destroy()
        if(req.cookies.elBaronDeLaCerveza){
            res.cookie('elBaronDeLaCerveza', '', {maxAge: -1})
        }

        res.redirect('/')
    }
}