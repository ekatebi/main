'use strict';

requirejs.config({
  baseUrl: 'app/bower_components',
  paths: {
    'component': '../js/component',
    'page': '../js/page',
    'js': '../js'
  }
});

require(
  [
    'flight/lib/compose',
    'flight/lib/registry',
    'flight/lib/advice',
    'flight/lib/logger',
    'flight/lib/debug'
  ],

  function(compose, registry, advice, withLogging, debug) {

    console.log("main");

    debug.enable(true);
    compose.mixin(registry, [advice.withAdvice]);

    require(['page/default'], function(initializeDefault) {
      initializeDefault();
    });


  }
);
