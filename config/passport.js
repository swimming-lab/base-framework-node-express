var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const { users } = require("../models");

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  users.findOne({email: email}).then(function(err, user) {
    if (err) { return done(err); }

    if (!user || !user.validPassword(password)) {
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));