const passport = require('passport');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  });

  User.findOne({email: req.body.email}, (err, existingUser) => {
    if(existingUser)
      return res.status(400).send('This email already has been registered')

    newUser.save((err) => {
      if(err)
        next(err)

      req.logIn(newUser, (err) => {
        if(err)
          next(err)

        res.send('User created with successful')
      })
    })
  })
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) 
      next(err)

    if(!user)
      return res.status(400).send('Email or password invalid')

    req.logIn(user, (err) => {
      if(err)
        next(err)

      res.send('Login successful')
    })    
  })(req, res, next);
}

exports.logout = (req, res) => {
  req.logout();
  res.send('Logout successful');
}