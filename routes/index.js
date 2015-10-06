
var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );
var NewsItem = mongoose.model( 'NewsItem' );

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
/*function (req, res) {
  NewsItem.find( function (err, items, count) {
    res.render( 'index', {
      title: 'All Items',
      items: items
    } );
  } );
};*/


router.get( '/news/' , function (req, res) {
  NewsItem.find( function (err, items, count) {
    /*res.render( 'index', {
      title: 'Index',
      items: items
    } );*/
    res.json({items: items});
  } );
} );
router.post( '/news/', function (req, res) {

  if(!req.body.hasOwnProperty('content') ||
   !req.body.hasOwnProperty('user_id')) {
  res.statusCode = 400;
  return res.send('Error 400: Post syntax incorrect.');
  }
  //console.log(req.body.content);
  //console.log(req.body.user_id);
  new NewsItem( {
    content: req.body.content,
    user_id: req.body.user_id,
    updated_at: Date.now()
  } ).save( function ( err, item, count ) {
    /*res.render( 'success', {message: 'News Item added !'})*/
    if(err){
      return res.send(err);
    }
    else{
      res.json({message: 'News Item added !'});
    }

  } )
} );

module.exports = router;
