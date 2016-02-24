/**
 * news.js - handles routes at '/news/'
 *
 * create new news-item, get all news-items.
 */
var path = require('path');
var router = require('express').Router();
var passport = require('passport');

var NewsItem = require(path.join(__dirname, '..', 'models', 'news-item'));


function onFindAll(req, res) {
  function onFind(err, items) {
    if (err) {
      res.status(500).json({
        items: [],
        message: "An error occured"
      })
    }
    res.json({
      items: items
    });
  }
  NewsItem.find({}, onFind);
}




function onCreate(req, res) {

  if (!req.body.hasOwnProperty('content')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  var news = new NewsItem({
    content: req.body.content,
    username: req.body.username,
    updated_at: Date.now()
  });


  function onSave(err, item) {
    if (err) {
      return res.send(err);
    } else {
      res.json({
        message: 'News Item added',
        item: item
      });
    }

  }
  news.save(onSave);

}

router.get('/', passport.authenticate('jwt', {
      session: false
    }), onFindAll);

router.post('/', passport.authenticate('jwt', {
      session: false
    }), onCreate);

module.exports = router;
