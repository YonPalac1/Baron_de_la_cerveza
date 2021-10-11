const db = require('../database/models');

module.exports = {
    products: (req, res) => {
         db.Product.findAll({
            include: [
                {association: "trademark",
                include: [{
                    association: "category"
                }]}
            ]
        })
        .then(product => {
            db.Product.findAll({
                where: {
                    outstanding: 1 
                }
            })
            .then(products => {
                res.render("products", {
                    titleBanner: "Pedi tu birra y te la llevamos a tu casa",
                    titleSlider: "Destacados",
                    product,
                    destacadosSlider: products,
                    session: req.session
                })
            })
        })

    },
    detail: (req, res) => {
        db.Product.findOne({
            where: {
              id: req.params.id,
            },
            include: [
                {association: "trademark",
                    include: [{association: "category"}]
                }
            ]
          })
          .then((product) => {
                res.render("productDetail", {
                titleBanner: "Detalles del producto",
                product,
                session: req.session,
            });
        })
            .catch((err) => console.log(err));
    },
    productCart: (req, res) => {
        let productCart = products.filter(element => element.cart === true)

        res.render("productCart", {
            titleBanner: "Comprala antes de que se caliente",
            productCart,
			session: req.session
        })
    }
}