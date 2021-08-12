const express = require("express");
const router = express.Router();
const controller = require("../controllers/configController");

router.get("/", controller.config);

module.exports = router;