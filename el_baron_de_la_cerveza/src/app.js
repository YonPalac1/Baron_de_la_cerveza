const express = require('express');
const app = express();
const path = require('path');
let cookieParser = require('cookie-parser');
let methodOverride = require('method-override');
let session = require('express-session');
let localsCheck = require('./middlewares/localsCheck');
const passport = require('passport');

/*  Enrutadores  */
let indexRouter = require('./routes/index.js');
let userRouter = require('./routes/users.js');
let productsRouter = require("./routes/products.js");
let adminRouter = require("./routes/admin/admin.js");

/*  Middleware  */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));
app.use(cookieParser())
app.use(session({
    secret: "elBaronDeLaCerveza",
    resave: false,
    saveUninitialized: true,
}))
app.use(localsCheck)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//Passport
app.use(passport.initialize());
app.use(passport.session());

/*  Rutas  */
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use("/admin", adminRouter);
app.use((req, res, next) => {
    res.status(404).render("error");
})

app.listen(3030, ()=>{
    console.log("Servidor corriendo")
})