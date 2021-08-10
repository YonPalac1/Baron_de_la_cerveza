let express = require('express');
let router = express.Router();
let controller = require('../controllers/purchaseController.js');

router.get('/', controller.purchase);

module.exports = router;