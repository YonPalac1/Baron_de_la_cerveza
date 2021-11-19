const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../database/models')


module.exports = () => {
    return(
        passport.use(
            new GoogleStrategy({
                clientID: '988474474081-kf4tvd4i5ljip37t2t5qvljd0vuamobt.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: "http://localhost:3030/users/auth/google/callback"
            },
            async function(accessToken, refreshToken, profile, done) {
                const user = await db.User.findOne({
                    where: {
                        social_id: profile.id
                    }
                })

                if(!user){
                    db.User.create({
                        name: profile.name.givenName,
                        email: profile.emails[0].value,
                        pass: null,
                        rol: 0,
                        bannerOk: 0,
                        social_id: profile.id,
                        social_provider: 'google'
                    })
                    .then(user =>{
                        db.Contact.create({
                            street: null,
                            city: null,
                            province: null,
                            phone: null,
                            userId: user.id
                        })
                        db.Avatar.create({
                            avatar: "avatar-default.png",
                            userId: user.id
                        })
                        return done(null, user)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                } else {
                    db.User.findOne({
                        where: {
                            social_id: profile.id
                        }
                    })
                    .then(user =>{
                        return done(null, user)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                }

            }
            )
        )
    )
}