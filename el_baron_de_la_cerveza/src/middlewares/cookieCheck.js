module.exports = function (req, res, next) {
    if(req.cookies.userElBaronDeLaCerveza){
        req.session.user = req.cookies.userElBaronDeLaCerveza
        res.locals.user = req.session.user
    }
    next()
} 