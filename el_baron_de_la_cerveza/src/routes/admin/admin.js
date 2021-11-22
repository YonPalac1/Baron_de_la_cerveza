const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/adminController");
const controllerCB = require("../../controllers/admin/categoriesBrandsController");
const controllerBanners = require("../../controllers/admin/bannersController");

let uploadProductFile = require('../../middlewares/uploadProductsFiles')
let uploadBannersFiles = require('../../middlewares/uploadBannersFiles')
let productValidator = require('../../middlewares/validations/productCreateValidator')
let userAdminCheck = require('../../middlewares/userAdminCheck')
let cookieCheck = require('../../middlewares/cookieCheck');
const updateAdmin = require('../../middlewares/validations/updateAdmin')

router.get("/", controller.signin);
router.get("/index", cookieCheck, userAdminCheck, controller.admin);

// Crud Usuarios
router.get("/users", userAdminCheck, controller.users);
router.delete('/users/delete/:id', controller.usersDestroy);

// Editar administrador
router.get("/users/editAdmin/:id", userAdminCheck, controller.userAdmin);
router.put("/users/editAdmin/:id", updateAdmin, controller.updateAdmin);

// Agregar nuevos administradores 
router.get("/users/addAdmin/", userAdminCheck, controller.addAdmin);
router.put("/users/addAdmin/", controller.addNewAdmin);


/* Crear un producto */
router.get("/products", userAdminCheck,cookieCheck, controller.products);
router.get("/products/create", userAdminCheck, controller.addProducts);
router.post('/products/create', uploadProductFile.array("images"), productValidator, controller.createProduct);


/* Crud de producto */
router.get("/products/edit/:id", userAdminCheck, controller.editProducts);
router.put("/products/edit/:id",uploadProductFile.array("images"), productValidator, controller.updateProducts);
router.delete('/products/delete/:id', controller.productDestroy);

// Crud de Banners
router.get("/banners/create", userAdminCheck, controllerBanners.addBanner);
router.post("/banners/create",uploadBannersFiles.single("banner"), productValidator, controllerBanners.createBanner);
router.delete('/banners/delete/:id', controllerBanners.bannerDestroy);


// Crud de Categorias
router.get("/category/create", userAdminCheck, controllerCB.addCategory);
router.post('/category/create', controllerCB.createCategory);
router.put('/category/create/:id', controllerCB.categoryDestroy);

// Crud de Marcas
router.get("/brand/create", userAdminCheck, controllerCB.addBrand);
router.post('/brand/create', controllerCB.createBrand);
router.put('/brand/create/:id', controllerCB.brandDestroy);

// Filtros de busqueda en administrador
router.get("/products/categories/:id", controllerCB.filter);
router.get("/products/brands/:id", controllerCB.filterBrands);


module.exports = router;