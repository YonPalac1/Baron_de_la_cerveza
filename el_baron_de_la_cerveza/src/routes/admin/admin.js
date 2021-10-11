const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/adminController");
let uploadProductFile = require('../../middlewares/uploadProductsFiles')
let productValidator = require('../../middlewares/validations/productCreateValidator')
let userAdminCheck = require('../../middlewares/userAdminCheck')
let cookieCheck = require('../../middlewares/cookieCheck');

router.get("/", controller.signin);
router.get("/index", cookieCheck, userAdminCheck, controller.admin);

router.get("/users", userAdminCheck, controller.users);

/* Eliminar un usuario */
router.delete('/users/delete/:id', controller.usersDestroy);

router.get("/products", userAdminCheck,cookieCheck, controller.products);

/* Crear un producto */
router.get("/products/create", userAdminCheck, controller.addProducts);
router.post('/products/create', uploadProductFile.single("images"), productValidator, controller.createProduct);

/* Editar un producto */
router.get("/products/edit/:id", userAdminCheck, controller.editProducts);
router.put("/products/edit/:id",uploadProductFile.single("image"), productValidator, controller.updateProducts);

/* Eliminar un producto */
router.delete('/products/delete/:id', controller.productDestroy);

module.exports = router;