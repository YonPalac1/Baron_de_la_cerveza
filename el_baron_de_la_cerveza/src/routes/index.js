let express = require('express');
let router = express.Router();
let controller = require('../controllers/indexController.js');
let userSessionCheck = require('../middlewares/userSessionCheck');
let cookieCheck = require('../middlewares/cookieCheck');

router.get('/', cookieCheck, controller.index);
router.get('/about', controller.about);
router.get('/contact', controller.contact);
router.get('/finalizePurchase/:id', userSessionCheck, controller.finalizePurchase);

router.get('/search', controller.search); 

module.exports = router;