let express = require('express');
let router = express.Router();
const { 
	user,
    login, 
	register, 
    processLogin,
    processRegister,
    updateUser,
    userEdit,
    logout
     } = require('../controllers/usersController');
let userLog = require('../middlewares/userLog');
let userSessionCheck = require('../middlewares/userSessionCheck');
let loginValidator = require('../middlewares/loginValidator')
const registerValidator = require('../middlewares/registerValidator')
const uploadUserAvatar = require('../middlewares/uploadUserAvatar')

router.get('/', userSessionCheck, user);

router.get('/login', userLog, login);
router.post('/login', loginValidator, processLogin);
router.get('/logout', userSessionCheck, logout);

/* GET - Register form */
router.get('/register', userLog, register);
router.post('/register', registerValidator, processRegister);

router.get('/edit/:id', userSessionCheck, userEdit)
router.put('/edit/:id', uploadUserAvatar.single('avatar'), updateUser)

module.exports = router;