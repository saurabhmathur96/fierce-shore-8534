var path = require('path');
require(path.join(__dirname, '..', 'db'));
var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var mongoose = require( 'mongoose' );
var NewsItem = mongoose.model( 'NewsItem' );
var User = mongoose.model( 'User' );


/*function (req, res) {
  NewsItem.find( function (err, items, count) {
    res.render( 'index', {
      title: 'All Items',
      items: items
    } );
  } );
};
*/


router.post('/register', function(req, res, next) {
  if(!req.body.hasOwnProperty('user_id') || !req.body.hasOwnProperty('password')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }
  else {

    var password_hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    new User({
      _id : req.body.user_id,
      user_id : req.body.user_id,
      password : password_hash
    }).save( function ( err, item, count ) {

      if(err){
        console.log(err);
        res.statusCode = 400;
        return res.send('Error 400: User id a.');
      }
      else{
        res.json({message: 'Registration Successful'});
      }

    } );
  }

});


router.post('/login', function(req, res, next) {
  if(!req.body.hasOwnProperty('user_id') ||
  !req.body.hasOwnProperty('password')) {
   res.statusCode = 400;
   return res.send('Error 400: Post syntax incorrect.');
 }
 else {
   User.findOne({user_id: req.body.user_id}, function (err, user) {
     if(!user){
       res.json({message: 'Credentials not valid'});
     }
     if(bcrypt.compareSync(req.body.password, user.password)) {
           res.json({message: 'Credentials valid'});
     }
     else {
           res.json({message: 'Credentials not valid'});
     }
   });
 }
});

router.get( '/news/' , function (req, res) {
  NewsItem.find( {}, function (err, items, count) {
    res.json({items: items});
  } );
} );
router.post( '/news/', function (req, res) {

  if(!req.body.hasOwnProperty('content') ||
     !req.body.hasOwnProperty('user_id') ||
     !req.body.hasOwnProperty('password')) {
      res.statusCode = 400;
      return res.send('Error 400: Post syntax incorrect.');
      }
  //bcrypt.compareSync(password, doc['password_hash'])

  User.findOne({user_id: req.body.user_id}, function (err, user) {
    if(bcrypt.compareSync(req.body.password, user.password)) {
      new NewsItem( {
        content: req.body.content,
        user_id: req.body.user_id,
        updated_at: Date.now()
      } ).save( function ( err, item, count ) {
        if(err){
          return res.send(err);
        }
        else{
          res.json({message: 'News Item added'});
        }

      } );

    }
    else {
      res.statusCode = 400;
      return res.send('Error 400: Authentication Error');
    }

  });
});


module.exports = router;
