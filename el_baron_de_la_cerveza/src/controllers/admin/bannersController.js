const { validationResult } = require('express-validator')
const db = require("../../database/models");

let bcrypt = require('bcryptjs')

module.exports = {
    addBanner: (req, res)=>{
        let bannerPromise = db.Banner.findAll()
        let userPromise = db.User.findOne(req.params.rol)

        Promise.all([bannerPromise, userPromise])
        .then(([banners, users]) =>{
            res.render("admin/addBanner", {
                banners,
                users,
                session: req.session,
            })
        })
    },
    createBanner: (req, res)=>{
        let errors = validationResult(req);
        if (req.fileValidatorError) {
        let image = {
            param: "banner",
            msg: req.fileValidatorError,
        };
        errors.push(image);
        }

        if (!errors.isEmpty()) {

            let arrayImages;
            if (req.file) {
                arrayImages = req.file.filename
            }else{
                arrayImages = "default-img.gif"
            }

        let { 
            banner
        } = req.body;

        db.Banner.create({
            banner: arrayImages
        })
        .then(() => {
            res.redirect("/admin/banners/create")            
        })
        .catch((err) => console.log(err));
            
        } else {
            db.Banner.findAll()
            .then((banners) => {
                res.render("admin/addBanner", {
                    banners,
                    session: req.session,
                })
            .catch((err) => console.log(err));
            })
        .catch((err) => console.log(err));   
        }
    },
    bannerDestroy: (req, res)=>{
        db.Banner.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.redirect("/admin/banners/create")
        })
    }
}