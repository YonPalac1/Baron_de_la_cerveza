let { products, users, writeUsersJSON } = require('../data/dataBase.js');
let { validationResult } = require('express-validator')
let bcrypt = require('bcryptjs')

const productCart = products.filter(element => element.cart === true)
		

module.exports = {
	user: (req, res) => {
		res.render('user', {
			titleBanner: "Configuración de frescura",
			productCart
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
            let user = users.find(user => user.email === req.body.email)

            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                rol: user.rol
            }  


            if(req.body.remember){
                res.cookie('elBaronDeLaCerveza', req.session.user, {expires: new Date(Date.now() + 900000), httpOnly : true})
            }
            
            res.locals.user = req.session.user

            res.redirect('/')
        }else{
            res.render('login', {
            	productCart,
                errors: errors.mapped(),
                session: req.session
            })
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
        let errors = validationResult(req)

        if (errors.isEmpty()) {

            let lastId = 0;

            users.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id
                }
            }) 

            let {
                name, 
                email, 
                pass1
            } = req.body

            let newUser = {
                id : lastId + 1,
                name,
                email,
                pass : bcrypt.hashSync(pass1, 12),
                fecha_registro:"10/03/2020",
                rol: "ROL_USER",
            }

            users.push(newUser)

            writeUsersJSON(users)

            res.redirect('/users/login')

        } else {
            res.render('register', {
                productCart,
                errors: errors.mapped(),
                old : req.body,
                session: req.session
            })
        }
    }
}