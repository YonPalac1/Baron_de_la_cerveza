const express = require('express');
const path = require('path');
const app = express();

/*  Middleware  */
app.use('/', express.static(__dirname + '/public'));


/*  Enrutadores  */
let indexRouter = require('./routes/index.js');
let loginRouter = require('./routes/login.js');

/*  Views  */
app.set('view engine', 'ejs');

/*  Rutas  */
app.use('/', indexRouter);
app.use('/login', loginRouter);



// Pagina de detalles de producto - Keila
app.get('/productDetail', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
})

// Pagina de carrito de compras - Kevin
app.get('/productCart', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/productCart.html'))
})

// Pagina con datos de contacto - Keila
app.get('/contact', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/contact.html'))
})
// Pagina donde se finalizaria la compra - Yonatan  
app.get('/finalizePurchase', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/finalizePurchase.html'))
})
// Pagina donde se finalizaria la compra - Yonatan  
app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/about.html'))
})
// Pagina donde se finalizaria la compra - Yonatan  
app.get('/config', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/config.html'))
})
// Pagina donde se finalizaria la compra - Yonatan  
app.get('/products', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/products.html'))
})


app.listen(3030, ()=>{
    console.log("Servidor corriendo")
})