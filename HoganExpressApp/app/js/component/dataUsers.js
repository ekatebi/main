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
        testMode: false,
        forceError:false,
        baseUrl: 'users',
        todoItems: ['orig item']
    });

      this.triggerError = function(msg, textStatus, errorThrown)
      {
          var m = 'error: ' + msg + ',' + textStatus + ',' + errorThrown;
          this.trigger('dataUserError', m);
      }

      this.addUpdateUser = function(e, data)
      {
//          console.log('addUpdateUser');
//          console.log(data);

          var url = this.attr.baseUrl;
          var verb = 'POST';

          if (data._id)
          {
              url += '/' + data._id;
          }
          else
          {
              data = _.omit(data, '_id');
              verb = 'PUT';
          }

          var id = data._id;
          var comp = this;

          console.log('addUpdateUser, verb: ' + verb + ',id: ' + id + ',url: ' + url);
          console.log(data);

          if (this.attr.testMode)
          {
              console.log('testMode');
              if (this.attr.forceError)
              {
                  console.log('forceError');
                  comp.trigger('dataUserError', {msg: 'test error message'});
                  return;
              }

              comp.trigger('dataUsersChanged');

              return;
          }

          $.ajax(
              {
                  type: verb,
                  url: url,
                  dataType: 'json',
                  data: data,
                  success: function() {
                      console.log('addUpdateUser (success), verb: ' + verb + ', id: ' + id);
                      comp.trigger('dataUsersChanged');
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      comp.triggerError( 'addUpdateUser, verb: ' + verb + ', id: ' + id, textStatus, errorThrown);
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

          var verb = 'DELETE';
          var url = this.attr.baseUrl + '/' + id;

          console.log('delUser,' + verb + ',' + url);

          $.ajax(
              {
                  type: verb,
                  url: url,
                  dataType: 'json',
//                  data: id,
                  success: function(data) {
                      console.log('delUser (success), verb: ' + verb + ', id: ' + id + ',' + data.msg);
                      comp.trigger('dataUsersChanged');
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      comp.triggerError( 'addUpdateUser, verb: ' + verb + ', id: ' + id, textStatus, errorThrown);
                  }
              });

      }

      this.getUsers = function()
      {
          var comp = this;
          console.log('dataUsers: getUsers,');

          var url = this.attr.baseUrl;

          $.ajax(
              {
                  type: 'GET',
                  url: url,
                  success: function(users) {
                      comp.trigger('dataUsersReady', [ users ]);
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

          var url = this.attr.baseUrl + '/' + id;

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

          console.log('initialize dataUsers: ' + this.attr.todoItems);

          this.on(document, "dataUsers", this.getUsers);
          this.on(document, "dataUser", this.getUser);
          this.on(document, "dataUsersAddUpdate", this.addUpdateUser);
          this.on(document, "dataUsersDelete", this.delUser);
//          this.on(document, "dataUserDelete", function(e, data) {console.log('dataUserDelete: ' + data.id);});
          this.on(document, "dataUsersTest", function() {
               console.log('dataUsersTest');
              });

          this.trigger("dataItems", {items: this.attr.todoItems});
//          this.trigger(document, "dataItems", {items: ['old item']});
    });
  }

});
