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
      home = require('component/home'),
      profile = require('component/profile'),
      users = require('component/users'),
      dataUsers = require('component/dataUsers'),
      messages = require('component/messages');

  return initialize;

  /**
   * Module function
   */

  function initialize() {

      console.log("initialize");

    // MyComponent.attachTo(document);

//      profile.attachTo('#ProfilePage');
//      profile.attachTo(document);
      dataUsers.attachTo(document);
      home.attachTo('#HomePage');
      users.attachTo('#UsersPage');
      messages.attachTo('#MessagesPage');
      pageContent.attachTo('#pageContent');
      pageSelect.attachTo('#pageNavBar');

  }

});
