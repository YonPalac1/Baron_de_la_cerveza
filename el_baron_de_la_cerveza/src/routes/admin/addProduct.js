const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/addController');

router.get('/', controller.add);

module.exports = router;