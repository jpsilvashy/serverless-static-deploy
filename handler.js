'use strict';

//
const handlers = require('./handlers');

// build
module.exports.build = (event, context, callback) =>
  handlers.buildHandler(event, context, (response) => {
    console.log(response);
    context.done(null, response);
  });
