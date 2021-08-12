const express = require('express');
const path = require('path');
const app = express();

/*  Middleware  */
app.use('/', express.static(__dirname + '/public'));


/*  Enrutadores  */
let indexRouter = require('./routes/index.js');
let loginRouter = require('./routes/login.js');
let purchaseRouter = require('./routes/finalizePurchase.js');
let productCartRouter = require("./routes/productCart");
let productsRouter = require("./routes/products.js");
let configRouter = require("./routes/config.js");

/*  Views  */
app.set('view engine', 'ejs');

/*  Rutas  */
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/finalizePurchase', purchaseRouter);
app.use('/productCart' , productCartRouter);
app.use('/products', productsRouter);
app.use("/config", configRouter);



// Pagina de detalles de producto - Keila
app.get('/productDetail', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
})

// Pagina con datos de contacto - Keila
app.get('/contact', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/contact.html'))
})
// Pagina donde se finalizaria la compra - Yonatan  
app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/about.html'))
})



app.listen(3030, ()=>{
    console.log("Servidor corriendo")
})