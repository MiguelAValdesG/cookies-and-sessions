const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const User = require('./models/user')

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

// const user = new User({
//   email: 'mvaldes@vainilladev.com',
//   name: 'MiguelAValdesG',
//   password: '1234567'
// })

// user.save()
//   .then(() => {
//     console.log('User saved'); 
//   })
//   .catch((error) => {
//     console.log(error);    
//   })

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

app.get('/', (req, res) => {
  req.session.count = req.session.count ? req.session.count + 1 : 1;
  res.send(`Hello! You have watched this page: ${req.session.count} times`)
})


app.listen(3000, () => {
  console.log('Listening in port 3000');
  
})

