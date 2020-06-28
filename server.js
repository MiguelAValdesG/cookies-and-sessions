const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const passportConfig = require('./config/passport')
const ctrlUser = require('./controllers/user')

const MONGO_URL = 'mongodb://127.0.0.1:27017/auth';
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', (err) => {
  throw err;
  process.exit(1);
})

app.use(session({
  secret: 'THIS IS A SECRET. HERE WE CAN PUT A VARIABLE OF ENVIRONMENT',
  resave: true, // This property force that every call to server save all information of the session in the DB without matter if was change or no 
  saveUninitialized: true,  
  store: new MongoStore({
    url: MONGO_URL,
    autoReconnect: true
  })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/signup', ctrlUser.signup);
app.post('/login', ctrlUser.login);
app.post('/logout', passportConfig.isAuth, ctrlUser.logout);

app.get('/userInfo', passportConfig.isAuth, (req, res) => {
  res.json(req.user)
})

app.listen(3000, () => {
  console.log('Listening in port 3000');
  
})

