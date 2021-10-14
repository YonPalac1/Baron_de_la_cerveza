const { check, body } = require('express-validator')
let bcrypt = require('bcryptjs')
const db = require('../../database/models');

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("Debes escribir un email")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un email válido"),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body('email')
    .custom(value => {
        return db.User.findOne({
            where: {
                email : value
            }
        })
        .then(user => {
            if(!user){
                return Promise.reject("Email incorrecto")
            }
        })
    }),
  
    body("pass").custom((value, { req }) => {
        return db.User.findOne({
            where: {
                email: req.body.email,
            },
        })
        .then((user) => {
            if (!bcrypt.compareSync(req.body.pass, user.dataValues.pass)) {
                return Promise.reject();
            }
        })
        .catch((error) => {
            return Promise.reject("Contraseña incorrecta");
        });
    }),
];