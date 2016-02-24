/**
 * NewsItem - A single news item.
 */

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var NewsItem = new Schema({
  user_id : String,
  content : String,
  updated_at : Date
});


module.exports = mongoose.model( 'NewsItem', NewsItem );
