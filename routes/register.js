var path = require('path');
require(path.join(__dirname, '..', 'db'));
var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();


router.get('/', function(req, res, next) {
  if(!req.body.hasOwnProperty('user_id') || !req.body.hasOwnProperty('password')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }
  else {

    new User({
      user_id : req.body.user_id,
      password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save( function ( err, item, count ) {
      /*res.render( 'success', {message: 'News Item added !'})*/
      if(err){
        return res.send(err);
      }
      else{
        res.json({message: 'Registration Successful'});
      }

    } )
  }

});

module.exports = router;
