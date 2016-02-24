/**
 * local-strategy.js - Authentication strategy via username & password.
 *  To be plugged into passport.js and used in conjunction with jwt-strategy.
 */

var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require(path.join(__dirname, '..', 'models', 'user'));

function verifyUser(username, password, done) {
  function onFind(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }
  var query = {
    username: username
  };
  User.findOne(query, onFind);
}

var options = {};

var localStrategy = new LocalStrategy(options, verifyUser);

module.exports = localStrategy;
