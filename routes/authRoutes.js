const passport = require('passport'); 
const requireLogin = require('../middlewares/requireLogin'); 

module.exports = ( app ) => {
  app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile']} )
  ); 

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/secret')
  });

  app.get('/api/logout', (req,res) => {
    req.logout(); 
    res.redirect('/')
  })

  app.get('/api/current_user', (req,res) => {
    res.send(req.user)
  })
  
  app.get('/secret', requireLogin, (req,res) => {
    res.send('You are logged in')
  })
}