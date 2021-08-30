const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/adminController");
let uploadProductFile = require('../../middlewares/uploadProductsFiles')

router.get("/", controller.admin);

router.get("/users", controller.users);

router.get("/products", controller.products);

/* Crear un producto */
router.get("/products/create", controller.addProducts);
router.post('/products/create', uploadProductFile.single("imagen"), controller.createProduct);

/* Editar un producto */
router.get("/products/edit/:id", controller.editProducts);
router.put("/products/edit/:id",uploadProductFile.single("imagen"),controller.updateProducts);

/* Eliminar un producto */
router.delete('/products/delete/:id', controller.productDestroy);

module.exports = router;