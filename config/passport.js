var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const { users } = require("../models");

passport.use(new LocalStrategy({
    usernameField: 'users[email]',
    passwordField: 'users[password]'
}, function(email, password, done) {
  users.findOne({email: email}).then(function(user) {
    if (!user || !user.validPassword(password)) {
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }
    return done(null, user);
  }).catch(done);
}));