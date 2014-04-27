define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */
  require('underscore/underscore');

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

      this.addUpdateUser = function(e, data)
      {
//          console.log('addUpdateUser');
//          console.log(data);

          var url = baseUrl;
          var ajaxType = 'POST';

          if (data._id)
          {
              url += '/' + data._id;
          }
          else
          {
              console.log('omit');
              data = _.omit(data, '_id');
              ajaxType = 'PUT';
          }

          var id = data._id;
          var comp = this;

          console.log('addUpdateUser,' + ajaxType + ',' + id + ',' + url);
          console.log(data);

          $.ajax(
              {
                  type: ajaxType,
                  url: url,
                  dataType: 'json',
                  data: data,
                  success: function() {
                      console.log('addUpdateUser (success),' + ajaxType + ',' + id);
                      comp.trigger('dataUsersChanged');
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      comp.triggerError( 'addUpdateUser,' + ajaxType + ',' + id, textStatus, errorThrown);
                  }
              });
      }

      this.delUser = function(e, user)
      {
          var comp = this;
          var id = user.id;

          if (!id)
          {
              id = 'null';
          }

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

      this.getUser = function(e,data)
      {
          var id = data.id;
          var comp = this;
          console.log('dataUsers: getUser,' + id);

          var url = baseUrl + '/' + id;

          $.ajax(
              {
                  type: 'GET',
                  url: url,
                  success: function(user) {
                      console.log(user);
                      comp.trigger('dataUserReady', user);
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      comp.triggerError( 'getUser,', textStatus, errorThrown);
                  }
              }
          );
      }

      this.after('initialize', function () {

          console.log('initialize dataUsers');

          this.on(document, "dataUsers", this.getUsers);
          this.on(document, "dataUser", this.getUser);
          this.on(document, "dataUsersAddUpdate", this.addUpdateUser);
          this.on(document, "dataUsersDelete", this.delUser);
//          this.on(document, "dataUserDelete", function(e, data) {console.log('dataUserDelete: ' + data.id);});
          this.on(document, "dataUsersTest", function() {
               console.log('dataUsersTest');
              });

    });
  }

});
