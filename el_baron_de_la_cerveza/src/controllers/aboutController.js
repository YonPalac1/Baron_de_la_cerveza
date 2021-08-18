module.exports = {
    about: (req, res) => {
        res.render("about", {
            titleBanner: "Acerca de Nosotros"
        })
    }
}