'use strict';

// Gulp deps
var fs       = require('fs');
var jsonfile = require('jsonfile');

// lib
var lib = require('../lib');

// Handler
function buildHandler(event, context, callback) {
  console.log('event', event);

  lib.gulpTasks('release', '/tmp/dist', function(id) {

    // build paths to show in response
    var releasePath = 'http://example.com/' + id;

    var response = {
      build: id,
      url: releasePath + '/index.html',
    };

    callback(response)
  });
};


// Exports
exports = module.exports = buildHandler;
