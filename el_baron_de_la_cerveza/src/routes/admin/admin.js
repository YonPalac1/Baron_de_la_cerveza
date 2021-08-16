const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/adminController");

router.get("/", controller.admin);

module.exports = router;