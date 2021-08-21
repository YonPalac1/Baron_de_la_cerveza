const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController.js");

router.get("/", controller.products);
router.get("/productCart", controller.productCart);
router.get("/productDetail/:id", controller.detail);

module.exports = router;
