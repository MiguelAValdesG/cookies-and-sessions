const passport = require('passport');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({email: req.body.email});
    if (existingUser)
      return res.status(400).send('This email already has been registered')

    const newUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });

    req.logIn(newUser, (err) => {
      if (err) return next(err);
      res.send('User created with successful')
    })
  } catch (err) {
    next(err);
  }
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user)
      return res.status(400).send('Email or password invalid')

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.send('Login successful')
    })
  })(req, res, next);
}

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send('Logout successful');
  });
}
