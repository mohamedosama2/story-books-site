const GoogleStrategy=require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');
const Keys=require('./keys');
const keys = require('./keys');

module.exports=function(passport){
    passport.use(new GoogleStrategy({
        clientID:keys.mongoClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy:true
    },(accessToken,refreshToken,profile,done)=>{
        console.log(accessToken)
        console.log(profile)
    }))
}