//Accesos de usuario: Verificamos que el usuario este registrado
module.exports = (req, res, next)=>{
	if(req.session.user){
		next();
	} else {
		res.redirect('/users/login');
	}
}