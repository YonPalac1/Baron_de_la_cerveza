let { products } = require('../../data/dataBase')

module.exports = {
    adminProducts: (req, res) => {
        res.render('admin/adminProducts', {
            products
        });
    }
}