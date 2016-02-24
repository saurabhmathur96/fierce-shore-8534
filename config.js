/**
 * config.js - global constants for the app
 */
module.exports = {
  MONGO_URI : process.env.NEWSAPP_MONGOLAB_URI || 'mongodb://localhost/NewsApp',
  SECRET: process.env.JWT_SECRET || 'secret',

};
