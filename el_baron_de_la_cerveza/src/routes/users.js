let express = require('express');
let router = express.Router();
const { 
	user,
    login, 
	register, 
    processLogin,
    processRegister,
    updateProfile
     } = require('../controllers/usersController');
let userLog = require('../middlewares/userLog');
let loginValidator = require('../middlewares/loginValidator')
const registerValidator = require('../middlewares/registerValidator')
const uploadUserAvatar = require('../middlewares/uploadUserAvatar')

router.get('/', user);


router.get('/login', userLog, login);
router.post('/login', loginValidator, processLogin);

/* GET - Register form */
router.get('/register', userLog,register);
router.post('/register', uploadUserAvatar.single('avatar'), registerValidator, processRegister);

module.exports = router;