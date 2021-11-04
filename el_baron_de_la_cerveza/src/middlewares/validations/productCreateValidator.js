let { check } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("El campo nombre no puede ir vacío")
    .isLength({ min: 3 })
    .withMessage("Ingrese más de 3 caracteres"),

    check("category")
    .notEmpty()
    .withMessage("Debes elegir una categoría"),

    check("brand")
    .notEmpty()
    .withMessage("Debes agregar una marca"),

    check('price')
    .notEmpty()
    .withMessage('Coloca un precio')
    .isNumeric()
    .withMessage("Solo puedes ingresar números"),

    check('discount')
    .notEmpty()
    .withMessage('Coloca un descuento')
    .isNumeric()
    .withMessage("Solo puedes ingresar números"),

    check('alcoholContent')
    .notEmpty()
    .withMessage('Coloca un Contenido Alcoholico')
    .isNumeric()
    .withMessage("Solo puedes ingresar números"),

    check('description')
    .notEmpty()
    .withMessage("Agrega una Descripción")
    .isLength({ min: 10 }, { max: 500 })
    .withMessage("Ingrese más de 10 caracteres")
]
