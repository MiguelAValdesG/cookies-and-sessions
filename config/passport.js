const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
  try {
    done(null, await User.findById(id));
  } catch (err) {
    done(err);
  }
})

passport.use(new LocalStrategy(
  {usernameField: 'email'},
  async (email, password, done) => {
    try {
      const user = await User.findOne({email});
      if (!user)
        return done(null, false, {message: `This email: ${email} is not registered`});

      const areEquals = await user.passwordCompare(password);
      if (areEquals)
        return done(null, user);
      return done(null, false, {message: 'The password is invalid'});
    } catch (err) {
      done(err);
    }
  }
))

exports.isAuth = (req, res, next) => {
 if(req.isAuthenticated()) {
   return next();
 }
 res.status(401).send('Need to do login for have access to this resource')
}
