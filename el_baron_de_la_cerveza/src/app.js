const express = require('express');
const path = require('path');
const app = express();
let methodOverride = require('method-override')


/*  Enrutadores  */
let indexRouter = require('./routes/index.js');
let userRouter = require('./routes/user.js');
let productsRouter = require("./routes/products.js");
let adminRouter = require("./routes/admin/admin.js");

/*  Middleware  */
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'))


/*  Rutas  */
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/products', productsRouter);
app.use("/admin", adminRouter);

app.listen(3030, ()=>{
    console.log("Servidor corriendo")
})