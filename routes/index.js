/**
 * index.js - handles login and sends jwt (valid for 1 day).
 */

var path = require('path');
var router = require('express').Router();
var passport = require('passport');
var async = require('async');
var jwt = require('jsonwebtoken');
var config = require(path.join(__dirname, '..', 'config'));

var User = require(path.join(__dirname, '..', 'models', 'user'));


function onLogin(req, res) {
  var payload = {
    username: req.user.username
  }
  var token = jwt.sign(payload, config.SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.json({
    message: 'login Successful',
    token: token
  });
}



router.post('/', passport.authenticate('local', {
      session: false
    }), onLogin);




module.exports = router;
