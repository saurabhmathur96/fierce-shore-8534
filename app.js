var path = require('path');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var mongoUri = process.env.NEWSAPP_MONGOLAB_URI || 'mongodb://localhost/NewsApp'
mongoose.connect(mongoUri);



var app = express();


var passport = require('passport');
var jwtStrategy = require(path.join(__dirname, 'authentication', 'jwt-strategy'));
var localStrategy = require(path.join(__dirname, 'authentication', 'local-strategy'));
passport.use(jwtStrategy);
passport.use(localStrategy);
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var index = require(path.join(__dirname, 'routes', 'index'));
var register = require(path.join(__dirname, 'routes', 'register'));
var news = require(path.join(__dirname, 'routes', 'news'));


app.use('/api/login/', index);
app.use('/api/news/', news);
app.use('/api/register/', register);

var router = express.Router();
router.get('/', function(req, res) {
  res.json({
    message: 'hello, world'
  });
});
app.use('/', router);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
    res.json({
      'error': {
        'message': err.message,
        'error': err
      }
    });
    console.log(err.stack);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
  res.json({
    'error': {
      'message': err.message
    }
  });
});

//app.post( '/create', routes.create );


module.exports = app;
