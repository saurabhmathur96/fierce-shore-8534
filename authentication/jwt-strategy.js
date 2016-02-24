/**
 * strategy.js - Authentication strategy via JSON Web Tokens. To be plugged into
 *  passport.js.
 */
var path = require('path');
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require(path.join(__dirname, '..', 'models', 'user'));



function verifyUser(payload, done) {
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
    username: payload.username
  };
  User.findOne(query, onFind);
}

var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeader();
options.secretOrKey = 'secret';
options.passReqToCallback = false;

var jwtStrategy = new JwtStrategy(options, verifyUser);

module.exports = jwtStrategy;
