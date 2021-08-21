let express = require('express');
let router = express.Router();
let controller = require('../controllers/userController.js');

router.get('/', controller.user);
router.get('/login', controller.login);

module.exports = router;