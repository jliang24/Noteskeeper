const express = require('express'); 
const passport = require('passport'); 
const mongoose = require('mongoose'); 
const keys = require('./config/keys'); 
const cookieSession = require('cookie-session'); 
const bodyParser = require('body-parser'); 

const app = express(); 
app.use(bodyParser.json())
mongoose.connect(keys.mongoURL); 

require('./Models/User'); 
require ('./Models/Board'); 
require('./Models/Cards')
require('./services/passport'); 

app.use(cookieSession({
  maxAge: 24* 60 * 60 * 1000 * 30,
  keys: [keys.cookieKey]
}))

app.use(passport.initialize()); 
app.use(passport.session()); 

require('./routes/boardRoutes')(app); 
require('./routes/authRoutes')(app); 
require('./routes/cardRoutes')(app); 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8000; 

app.listen(port, () => console.log(`App is running on localhost: ${port}`)); 