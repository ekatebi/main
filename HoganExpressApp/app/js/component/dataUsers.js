define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(dataUsers);

  /**
   * Module function
   */

  function dataUsers() {

    this.defaultAttrs({

    });

      var baseUrl = '/users';

      this.triggerError = function(msg, textStatus, errorThrown)
      {
          var m = 'error: ' + msg + ',' + textStatus + ',' + errorThrown;
          this.trigger('dataUserError', m);
      }

      this.addUpdateUser = function(e, user)
      {
          var comp = this;
          var ajaxType = (typeof  user._id != 'undefined') ? 'POST' : 'PUT';
          var url = baseUrl + (typeof  user._id != 'undefined') ? ('/' + user._id): '';

          console.log('addUpdateUser,' + ajaxType + ',' + user._id + ',' + url);

          $.ajax(
              {
                  type: ajaxType,
                  url: url,
                  dataType: 'json',
                  data: user,
                  success: function() {
                      console.log('addUpdateUser (success),' + ajaxType + ',' + user._id);
                      this.trigger('dataUsersChanged');
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      this.triggerError( 'addUpdateUser,' + ajaxType + ',' + user._id, textStatus, errorThrown);
                  }
              });
      }

      this.delUser = function(e, user)
      {

          var comp = this;
          var id = user.id;
          var ajaxType = 'DELETE';
          var url = baseUrl + '/' + id;

          console.log('delUser,' + ajaxType + ',' + url);

          $.ajax(
              {
                  type: ajaxType,
                  url: url,
                  dataType: 'json',
//                  data: id,
                  success: function(data) {
                      console.log('delUser (success),' + ajaxType + ',' + id + ',' + data.msg);
                      comp.trigger('dataUsersChanged');
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      comp.triggerError( 'addUpdateUser,' + ajaxType + ',' + id, textStatus, errorThrown);
                  }
              });

      }

      this.getUsers = function()
      {
          var comp = this;
          console.log('dataUsers: getUsers,');

          var url = baseUrl;

          $.ajax(
              {
                  type: 'GET',
                  url: url,
                  success: function(users) {
                      comp.trigger('dataUsersReady', users);
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      comp.triggerError( 'getUsers,', textStatus, errorThrown);
                  }
              }
          );
      }

      this.after('initialize', function () {

          console.log('initialize dataUsers');

          this.on(document, "dataUsers", this.getUsers);
          this.on(document, "dataUsersAddUpdate", this.addUpdateUser);
          this.on(document, "dataUsersDelete", this.delUser);
//          this.on(document, "dataUserDelete", function(e, data) {console.log('dataUserDelete: ' + data.id);});
          this.on(document, "dataUsersTest", function() {
               console.log('dataUsersTest');
              });

    });
  }

});
