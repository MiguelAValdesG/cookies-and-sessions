const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})

passport.use(new LocalStrategy(
  {usernameField: 'email'},
  (email, password, done) => {
    User.findOne({email}, (err, user) => {
      if(!user)
        return done(null, false , {message: `This email: ${email} is not registered`});
      else {
        user.passwordCompare(password, (err, areEquals) => {
          if (areEquals)
            return done(null, user);
          else
            return done(null, false, {message: 'The password is invalid'});
        })
      }
    }) 
  }
))

exports.isAuth = (req, res, next) => {
 if(req.isAuthenticated()) {
   return next();
 }
 res.status(401).send('Need to do login for have access to this resource')
}