const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/adminController");

router.get("/", controller.admin);

router.get("/users", controller.users);

router.get("/products", controller.products);

router.get("/addProduct", controller.addProducts);

module.exports = router;