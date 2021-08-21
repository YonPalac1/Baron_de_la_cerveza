let { products } = require('../../data/dataBase')

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
        res.render('admin/addProduct');
    }
}