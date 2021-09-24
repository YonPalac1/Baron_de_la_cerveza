module.exports = function (req, res, next) {
    if(req.cookies.elBaronDeLaCerveza){
        req.session.user = req.cookies.elBaronDeLaCerveza
        res.locals.user = req.session.user
    }
    next()
} 