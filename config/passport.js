const GoogleStrategy=require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');
const keys = require('./keys');
const User=require('../models/user')

module.exports=function(passport){
    passport.use(new GoogleStrategy({
        clientID:keys.mongoClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy:true
    },(accessToken,refreshToken,profile,done)=>{
       // console.log(accessToken)
        console.log(profile.photos[0].value)
        User.findOne({
            googleID:profile.id
        })
        .then(user=>{
            if(user){
                done(null,user)
            }else{
                const user=new User({
                    googleID:profile.id,
                    email:profile.emails[0].value,
                    firstname:profile.name.givenName,
                    lastname:profile.name.familyName,
                    image:profile.photos[0].value
                })
                user.save().then(()=>{
                    console.log('donee')
                    done(null,user)
                }).catch(err=>console.log(err))
            }
        })

    }))
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{
        User.findById(id)
        .then(user=>{
            done(null,user)
        })
    })

}