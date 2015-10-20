var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var NewsItem = new Schema({
  user_id : String,
  content : String,
  updated_at : Date
});

var User = new Schema({
  _id : String,
  user_id : String,
  password: String
});

mongoose.model( 'NewsItem', NewsItem );
mongoose.model( 'User', User );

var mongoUri = process.env.NEWSAPP_MONGOLAB_URI || 'mongodb://localhost/NewsApp'
//console.log(mongoUri);
mongoose.connect( mongoUri );
