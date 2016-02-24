/**
 * register.js - handles new registrations
 *
 */
var path = require('path');
var User = require(path.join(__dirname, '..', 'models', 'user'));
var router = require('express').Router();

function onRegister(req, res) {

  if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
    return res.status(400).json({
      message: 'Post syntax incorrect.'
    });
  }

  var user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  function onSave(err, item) {
    if (err) {
      return res.status(500).json({
        message: 'Username taken'
      });
    }
    return res.json({
      message: 'Registration Successful'
    });
  }

  return user.save(onSave);

}

router.post('/', onRegister);

module.exports = router;
