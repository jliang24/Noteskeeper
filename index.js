const express = require('express'); 
const passport = require('passport'); 
const mongoose = require('mongoose'); 
const keys = require('./config/keys'); 
const cookieSession = require('cookie-session'); 

const app = express(); 
mongoose.connect(keys.mongoURL); 
require('./Models/User'); 
require('./services/passport'); 
app.use(cookieSession({
  maxAge: 24* 60 * 60 * 1000 * 30,
  keys: [keys.cookieKey]
}))

app.use(passport.initialize()); 
app.use(passport.session()); 

require('./routes/authRoutes')(app); 


const port = process.env.PORT || 8000; 

app.listen(port, () => console.log(`App is running on localhost: ${port}`)); 