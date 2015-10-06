var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var NewsItem = new Schema({
  user_id : String,
  content : String,
  updated_at : Date
});

mongoose.model( 'NewsItem', NewsItem );

var mongoUri = process.env.NEWSAPP_MONGOLAB_URI || 'mongodb://localhost/NewsApp'
//console.log(mongoUri);
mongoose.connect( mongoUri );
