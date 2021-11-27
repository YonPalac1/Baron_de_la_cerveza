const { check, body } = require('express-validator')
let bcrypt = require('bcryptjs')
const db = require('../../database/models');

module.exports = [

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña actual'),

    body('pass')
    .custom((value, { req }) => {
        return db.User.findByPk(req.params.id)
        .then((user) => {
            if (!bcrypt.compareSync(req.body.pass, user.dataValues.pass)) {
                return Promise.reject();
            }
        })
        .catch((error) => {
            return Promise.reject("Debe ingresar su contraseña actual");
        });
    })
]