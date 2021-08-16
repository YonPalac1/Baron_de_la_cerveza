const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/usersController");

router.get("/", controller.users);

module.exports = router;