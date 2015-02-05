'use strict';

var FeedParser = require('feedparser'),
    debug = require('debug')('metalsmith-feed-ingest')
    request = require('request');

/**
 * A Metalsmith plugin to ingest rss feeds.
 */

module.exports = function plugin(options) {

  options = options || {};

  options.feeds.forEach( function(feed){
    debug('checking feed: %s', feed);
  });

  /**
   *
   * @param {Object} files
   * @param {Metalsmith} metalsmith
   * @param {Function} done
   */
  return function(files, metalsmith, done) {
  };

};

function parseFeed(url){

  var req = request('http://somefeedurl.xml'),
      feedparser = new FeedParser([options]);

  debug('parseFeed parsing: %s', url);

  req.on('error', function (error) {
    // handle any request errors
    debug('parseFeed request error: ', error);
  });

  req.on('response', function (res) {
    var stream = this;
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    stream.pipe(feedparser);
    debug('parseFeed response: %s', response);
  });

  feedparser.on('error', function(error) {
    // always handle errors
    debug('parseFeed parser error: %s', error);
  });

  feedparser.on('readable', function() {
    // This is where the action is!
    debug('parseFeed feed readable: %s', error);
    var stream = this,
      meta = this.meta, // **NOTE** the "meta" is always available in the context of the feedparser instance
      item;
      while (item = stream.read()) {
        console.log(item);
        debug('parseFeed item: %s', item);
      }
  });

}
