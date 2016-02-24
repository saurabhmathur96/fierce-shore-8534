/**
 * index.js - handles routes at '/'
 */

var path = require('path');
var router = require('express').Router();
var passport = require('passport');
var async = require('async');
var jwt = require('jsonwebtoken');

var User = require(path.join(__dirname, '..', 'models', 'user'));





function onLogin(req, res) {
  var payload = {
    username: req.user.username
  }
  var token = jwt.sign(payload, 'secret', {
    expiresInMinutes: 1440 // expires in 24 hours
  });
  res.json({
    message: 'login Successful',
    token: token
  });
  console.log(req.user);
}



router.post('/', passport.authenticate('local', {
      session: false
    }), onLogin);




module.exports = router;
