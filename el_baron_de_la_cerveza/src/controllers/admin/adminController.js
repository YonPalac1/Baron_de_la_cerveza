let { products, writeProductsJSON, users, writeUsersJSON } = require('../../data/dataBase')

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
        res.render("admin/users", {
            users
        });
    },
    usersDestroy: (req, res) => {
        users.forEach( usuarios => {
            if(usuarios.id === +req.params.id){
               let usersToDestroy = users.indexOf(usuarios);
               users.splice(usersToDestroy, 1)
            }
        })
        writeUsersJSON(users)
        res.redirect('/admin/users')
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
            destacado,
            marca,
            graduacion,
            } = req.body;

        let newProduct = {
            id: lastId + 1,
            name,
            precio,
            description,
            discount,
            category,
            destacado,
            marca,
            graduacion,
           imagen: req.file ? req.file.filename : "default-image.png"
        };

        products.push(newProduct);

        writeProductsJSON(products);

        res.redirect('/admin/products')
    },
    editProducts: (req, res) => {
        let product = products.find(product => product.id === +req.params.id);
        res.render("admin/editProduct",{
            product,
            category,
        })
    },
    updateProducts: (req, res) => {
        let {
            name, 
            precio, 
            discount,
            marca, 
            category,  
            description,
            destacado,
            graduacion,
        } = req.body;
        
        products.forEach(product => {
			if(product.id === +req.params.id) {
				product.id = product.id,
				product.name = name,
				product.precio = precio,
				product.discount = discount,
				product.marca = marca,
                product.category = category,
				product.description = description,
                product.destacado = destacado,
                product.graduacion = graduacion,
				product.imagen = req.file ? req.file.filename : product.imagen;
			}
		})

        writeProductsJSON(products)

        res.redirect("/admin/products")

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
    },

    signin: (req, res)=> {
        res.render('admin/adminLogin')
    }


}