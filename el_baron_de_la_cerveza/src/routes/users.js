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
    logout,
    productCart,
    passwordEdit,
    passwordUpdate,
    userDelete,
    userDestroy,
    loginGoogle,
     } = require('../controllers/usersController');
let userLog = require('../middlewares/userLog');
let userSessionCheck = require('../middlewares/userSessionCheck');
let loginValidator = require('../middlewares/validations/loginValidator')
const registerValidator = require('../middlewares/validations/registerValidator')
const updateProfile = require('../middlewares/validations/updateProfile')

const deleteUserCheck = require('../middlewares/validations/deleteUserCheck')
const uploadUserAvatar = require('../middlewares/uploadUserAvatar')
const passport = require('passport');
const googleLogin = require('../functions/googleLogin');
googleLogin()

passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user, done) {
  done(null, user);
});
  

router.get('/', userSessionCheck, user);

router.get("/productCart/:id", userSessionCheck, productCart);

router.get('/login', userLog, login);
router.post('/login', loginValidator, processLogin);
router.get('/logout', userSessionCheck, logout);

/* GET - Register form */
router.get('/register', userLog, register);
router.post('/register', uploadUserAvatar.single('avatar'), registerValidator, processRegister);

// Editar usuario
router.get('/edit/:id', userSessionCheck, userEdit)
router.put('/edit/:id', uploadUserAvatar.single('avatar'), updateUser)

// Editar contraseña 
router.get('/edit_password/:id', userSessionCheck, passwordEdit)
router.put('/edit_password/:id', updateProfile, passwordUpdate)

// Eliminar usuario 
router.get('/destroyUser/:id', userSessionCheck, userDelete)
router.delete('/destroyUser/:id', deleteUserCheck, userDestroy)


/* GOOGLE LOGIN */
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/login' }), loginGoogle);


module.exports = router;