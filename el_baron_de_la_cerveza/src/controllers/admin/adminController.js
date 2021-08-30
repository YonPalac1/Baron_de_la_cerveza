let { products, writeProductsJSON } = require('../../data/dataBase')

let category = [];
products.forEach(product => {
    if(!category.includes(product.category)){
        category.push(product.category)
    }  
});

module.exports = {
    admin: (req, res) => {
        res.render("admin/admin", {
        	
        })
    },
    users:(req, res) => {
        res.render("admin/users")
    },

    products: (req, res) => {
        res.render('admin/adminProducts', {
            products
        });
    },
    addProducts: (req, res) => {
        res.render('admin/addProduct', {
            category
        });
    },
    createProduct: (req, res)=>{
        let lastId = 1;

        products.forEach(product => {
            if(product.id > lastId){
                lastId = product.id
            }
        })

        let {
            name, 
            precio, 
            discount, 
            category,  
            description,
            } = req.body;

        let newProduct = {
            id: lastId + 1,
            name,
            precio,
            description,
            discount,
            category,
            imagen: req.file ? [req.file.filename] : "default-image.png"
        };

        products.push(newProduct);

        writeProductsJSON(products)

        res.redirect('/admin/products')
    },
    productDestroy: (req, res) => {
        products.forEach( product => {
            if(product.id === +req.params.id){
               let productToDestroy = products.indexOf(product);
               products.splice(productToDestroy, 1)
            }
        })
        
        writeProductsJSON(products)

        res.redirect('/admin/products')
    }
}