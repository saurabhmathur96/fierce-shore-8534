/**
 * NewsItem - A single news item.
 */

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var NewsItem = new Schema({
  username : String,
  content : String,
  updated_at : {
    type: Date,
    default: Date.now(),
    expires: '86400s'
  }
});


module.exports = mongoose.model( 'NewsItem', NewsItem );
