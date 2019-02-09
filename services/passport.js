const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const keys = require('../config/keys'); 
const mongoose = require('mongoose'); 

const User = mongoose.model('Users')

passport.serializeUser((user, done) => {
  done(null, user.id); 
})

passport.deserializeUser((id, done) => {
  User.findById(id).then( user => {
    done(null,user)
  })
})

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID, 
  clientSecret: keys.googleClientSecret, 
  callbackURL: '/auth/google/callback',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo', 
  proxy: true
}, 
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleId: profile.id }); 
    if (user) {
      return done(null, user); 
    }
    const newUser = await new User ({googleId: profile.id}).save(); 
    done(null, newUser); 
  }
)); 