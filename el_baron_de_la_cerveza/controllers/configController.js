module.exports = {
    config: (req, res) => {
        res.render("config", {
            titleBanner: "Configuracion de frescura"
        })
    }
}