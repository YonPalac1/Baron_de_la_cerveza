module.exports = {
	purchase: (req, res) => { 
		res.render('finalizePurchase', {
			titleBanner: "Finalizar Compra"
		});
	}
}