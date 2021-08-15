const express = require('express');
const path = require('path');
const app = express();


/*  Enrutadores  */
let indexRouter = require('./routes/index.js');
let loginRouter = require('./routes/login.js');
let purchaseRouter = require('./routes/finalizePurchase.js');
let productCartRouter = require("./routes/productCart");
let productsRouter = require("./routes/products.js");
let configRouter = require("./routes/config.js");
let detailRouter = require("./routes/productDetail.js");
let contactoRouter = require("./routes/contacto.js");
let aboutRouter = require("./routes/about.js");
let adminRouter = require("./routes/admin.js");

/*  Middleware  */
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/*  Rutas  */
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/finalizePurchase', purchaseRouter);
app.use('/productCart' , productCartRouter);
app.use('/products', productsRouter);
app.use("/config", configRouter);
app.use("/productDetail", detailRouter);
app.use("/contact", contactoRouter);
app.use("/about", aboutRouter);
app.use("/admin", adminRouter);

app.listen(3030, ()=>{
    console.log("Servidor corriendo")
})