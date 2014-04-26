define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(users);

  /**
   * Module function
   */

  function users() {

      this.defaultAttrs({
          editUser: '.editUser',
          delUser: '.delUser',
          createUser: '#createUser',
          ProfilePage: '#ProfilePage',
          profilePage: '#profilePage',
          btnSaveProfile: '#btnSaveProfile',
          profileForm: 'profileForm',
          formElement: 'form'
      });

      this.render = function (data) {
          console.log('users: render');
//          this.getUsers();
          var name = 'Users';
          var renderedTemplate = templates[name].render(data);
          this.$node.html(renderedTemplate);
          this.$node.show();
      }

      this.activate = function () {
          console.log('activate users page');
          this.getUsers();
      }

      this.deactivate = function () {
          console.log('deactivate users page');
          this.$node.hide();
      }

      this.createUser = function () {
          var data = {firstName: 'Ed', lastName: 'Katebi', phone: '(978) 855-2991', email: 'ekatebi@gmail.com' };
          this.renderModal(data);
      }

      this.editUser = function (data) {
          this.renderModal(data);
      }


      this.renderModal = function (parameters)
      {
          var NameOfTemplate = 'ProfileModalEx';
          var renderedTemplate = templates[NameOfTemplate].render(parameters);

//          this.$node.append(renderedTemplate);
//          this.select('ProfilePage').append(renderedTemplate);
          this.select('ProfilePage').html(renderedTemplate);

          var options = {
              "backdrop": "static"
          }

          this.select('profilePage').modal(options);
      }

      this.postProfile = function()
      {
          console.log('postProfile');

          console.log(this.select('formElement'));
          console.log(this.select('formElement').serialize());
          console.log(this.select('formElement').serializeArray());

          var postVal = JSON.stringify(this.select('formElement').serializeArray());
          var postVal2 = this.select('formElement').serializeArray();
          console.log(postVal);

          this.trigger('dataUserAddUpdate', postVal2);
/*
          $.ajax(
              {
                  type: 'POST',
                  url: '/profile',
                  dataType: 'json',
                  data: postVal2,
                  statusCode: {
                      404: function () {
                          alert("page not found");
                      },
                      200: function () {
//                          alert("success");
                      },
                      500: function () {
                          alert("server exception");
                      }
                  }
              }
          );

          var comp = this;

          this.select('profilePage').on('hidden.bs.modal', function (e) {
//              console.log('hidden.bs.modal fired!!!');
              comp.trigger('uiActivateUsersPage');
          }).modal('hide');

*/

          this.select('profilePage').modal('hide');

      }

      this.getUsers = function()
      {
          var comp = this;

          $.ajax(
              {
                  type: 'GET',
                  url: '/users',
//                  dataType: 'json',
                  success: function(users) {
//                      console.log(users);
                      comp.render(users);
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      alert("Status: " + textStatus);
                      alert("Error: " + errorThrown);
                  }

                  /*
                   statusCode: {
                   404: function () {
                   alert("page not found");
                   },
                   200: function () {
                   //                          alert("success");
                   },
                   500: function () {
                   alert("server exception");
                   }
                   */

              }
          );
      }

      this.after('initialize', function ()
      {
          console.log('initialize users');

//          this.on("dataGetUsers", this.getUsers());

//          this.on(document, "uiActivateUsersPage", this.activate);
          this.on(document, "uiActivateUsersPage", function() {
            this.trigger('dataUsers');
          });

          this.on(document, "uiDeactivateUsersPage", this.deactivate);

//          this.on(document, "dataUsersChanged", this.activate);

          this.on(document, "dataUsersReady", this.activate);

          //

          this.on('click', function (e, data) {

//              console.log('clicked');

              var a = $(e.target).closest('a');

              if (a.attr('id') == 'createUser') {
                  console.log('clicked createUser');
                  this.createUser(null);
              }

              if (a.attr('class') == 'editUser') {
                  var data = a.data('user_db_id');
                  console.log('clicked editUser: ' + data);
                  this.editUser(data);
              }

              if (a.attr('class') == 'delUser') {
                  var id = a.data('user_db_id');
                  console.log('clicked delUser: ' + id);
                  this.trigger('dataUsersDelete', {id: id});
//                  console.log('dataUserDelete event triggered');
              }

              var btn = $(e.target).closest('button');
              if (btn.attr('id') == 'btnSaveProfile') {
                  console.log('clicked save profile');
                  this.postProfile();
              }
          });

      });
  }

});
