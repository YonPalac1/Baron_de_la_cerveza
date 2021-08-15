const express = require("express");
const router = express.Router();
const controller = require("../controllers/productCartController.js");

router.get("/", controller.productCart);

module.exports = router;