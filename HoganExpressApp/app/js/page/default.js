define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  // var MyComponent = require('component/my_component');

  /**
   * Module exports
   */
    var pageSelect = require('component/pageSelect'),
      pageContent = require('component/pageContent'),
      profile = require('component/profile');

  return initialize;

  /**
   * Module function
   */

  function initialize() {

      console.log("initialize");

    // MyComponent.attachTo(document);


      pageContent.attachTo('#pageContent');
      pageSelect.attachTo('#pageNavBar');
//      profile.attachTo('#profilePage');

  }

});
