let express = require('express');
let router = express.Router();
const { 
	user,
    login, 
	register, 
    processLogin
     } = require('../controllers/usersController');
let userLog = require('../middlewares/userLog');
let loginValidator = require('../middlewares/loginValidator')

router.get('/', user);


router.get('/login', userLog, login);
router.post('/login', loginValidator, processLogin);


router.get('/register', register);

module.exports = router;