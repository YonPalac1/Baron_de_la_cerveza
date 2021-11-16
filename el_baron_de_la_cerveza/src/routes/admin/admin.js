const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/adminController");
let uploadProductFile = require('../../middlewares/uploadProductsFiles')
let uploadBannersFiles = require('../../middlewares/uploadBannersFiles')
let productValidator = require('../../middlewares/validations/productCreateValidator')
let userAdminCheck = require('../../middlewares/userAdminCheck')
let cookieCheck = require('../../middlewares/cookieCheck');
const updateAdmin = require('../../middlewares/validations/updateAdmin')

router.get("/", controller.signin);
router.get("/index", cookieCheck, userAdminCheck, controller.admin);

router.get("/users", userAdminCheck, controller.users);
router.get("/users/editAdmin/:id", userAdminCheck, controller.userAdmin);
router.put("/users/editAdmin/:id", updateAdmin, controller.updateAdmin);



/* Eliminar un usuario */
router.delete('/users/delete/:id', controller.usersDestroy);

router.get("/products", userAdminCheck,cookieCheck, controller.products);

router.get("/products/categories/:id", controller.filter);

router.get("/products/brands/:id", controller.filterBrands);

/* Crear un producto */
router.get("/products/create", userAdminCheck, controller.addProducts);
router.post('/products/create', uploadProductFile.array("images"), productValidator, controller.createProduct);

router.get("/category/create", userAdminCheck, controller.addCategory);
router.post('/category/create', controller.createCategory);
router.put('/category/create/:id', controller.categoryDestroy);

router.get("/brand/create", userAdminCheck, controller.addBrand);
router.post('/brand/create', controller.createBrand);

/* Editar un producto */
router.get("/products/edit/:id", userAdminCheck, controller.editProducts);
router.put("/products/edit/:id",uploadProductFile.array("images"), productValidator, controller.updateProducts);

/* Eliminar un producto */
router.delete('/products/delete/:id', controller.productDestroy);

router.get("/banners/create", userAdminCheck, controller.addBanner);
router.post("/banners/create",uploadBannersFiles.single("banner"), productValidator, controller.createBanner);

router.delete('/banners/delete/:id', controller.bannerDestroy);

module.exports = router;