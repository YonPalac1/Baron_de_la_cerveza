let express = require('express');
let router = express.Router();
let controller = require('../controllers/indexController.js');

router.get('/', controller.index);
router.get('/about', controller.about);
router.get('/contact', controller.contact);
router.get('/finalizePurchase', controller.finalizePurchase);

router.get('/search', controller.search); 

module.exports = router;