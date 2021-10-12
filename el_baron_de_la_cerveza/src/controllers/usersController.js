let { products, users, writeUsersJSON } = require('../data/dataBase.js');
let { validationResult } = require('express-validator')
let bcrypt = require('bcryptjs')
const db = require('../database/models')

const productCart = products.filter(element => element.cart === true)
		

module.exports = {
	user: (req, res) => {
        db.User.findByPk(req.session.user.id, {
            include: [{
                association: "contacts"
            }]
        })
        .then(user => {
            res.render('user', {
                titleBanner: "Perfil de frescura",
                productCart,
                session: req.session,
                user
            })
        })
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
            let { name, email, pass1 } = req.body;
            db.User.create({
                name,
                email,
                pass: bcrypt.hashSync(pass1, 12),
                avatar: req.file ? req.file.filename : "avatar-default.png",
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
        let user = users.find(user => user.id === +req.params.id)

        res.render('userProfileEdit', {
            titleBanner: "Editar perfil",
            productCart,
            user,
            session: req.session
        })

    },
    updateUser: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let user = users.find(user => user.id === +req.params.id)

            let {
                name,
                last_name,
                tel,
                address,
                pc,
                province,
                city
            } = req.body

            user.name = name
            user.last_name = last_name
            user.tel = tel
            user.address = address
            user.pc = pc
            user.province = province
            user.city = city
            user.avatar = req.file ? req.file.filename : user.avatar

            writeUsersJSON(users)

            delete user.pass

            req.session.user = user

            res.redirect('/users')

        }else{
            res.render('userProfileEdit', {
                titleBanner: "Editar perfil",
                productCart,
                errors: errors.mapped(),
                old:req.body,
                session: req.session
            })
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