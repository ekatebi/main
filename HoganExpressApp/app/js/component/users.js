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
          var renderedTemplate = templates[name].render( {users: data});
          this.$node.html(renderedTemplate);
          this.$node.show();
      }

      this.activate = function () {
          console.log('activate users page');
          this.getUsers();
//          this.select('profilePage').modal('hide');
      }

      this.deactivate = function () {
          console.log('deactivate users page');
          this.$node.hide();
      }

      this.createUser = function () {
          var data = {firstname: 'Ed', lastname: 'Katebi', phone: '(978) 855-2991', email: 'ekatebi@gmail.com' };
          this.renderModal(data);
      }

      this.editUser = function (e, data) {
          this.renderModal(data);
      }


      this.renderModal = function (parameters)
      {
          console.log('renderModal');
          console.log(parameters);

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

          var postVal2 = this.select('formElement').serializeArray();
          console.log(postVal2);

          var data = postVal2;
          var postVal = _.object(_.map(data, function(x){return [x.name, x.value]}));
          console.log(postVal);

          var comp = this;

          this.select('profilePage').on('hidden.bs.modal', function (e) {
//              console.log('hidden.bs.modal fired!!!');
                comp.trigger('dataUsersAddUpdate', postVal);
             }).modal('hide');

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

          this.on(document, "dataUsersChanged", function() {
              this.trigger('dataUsers');
          });

          this.on(document, "dataUsersReady", this.activate);
          this.on(document, "dataUserReady", this.editUser);

          //

          this.on('click', function (e, data) {

//              console.log('clicked');

              var a = $(e.target).closest('a');

              if (a.attr('id') == 'createUser') {
                  console.log('clicked createUser');
                  this.createUser(null);
              }

              if (a.attr('class') == 'editUser') {
                  var id = a.data('user_db_id');
                  console.log('clicked editUser: ' + id);
                  this.trigger('dataUser', {id: id});
//                  this.editUser(data);
              }

              if (a.attr('class') == 'delUser') {
                  var id = a.data('user_db_id');
                  console.log('clicked delUser: ' + id);
                  this.trigger('dataUsersDelete', {id: id});
//                  console.log('dataUserDelete event triggered');
              }

              var btn = $(e.target).closest('button');

              if (btn.attr('name') == 'delUser') {
                  var id = btn.data('user_db_id');
                  console.log('clicked delUser: ' + id);
                  this.trigger('dataUsersDelete', {id: id});
              }
              else if (btn.attr('name') == 'editUser') {
                  var id = btn.data('user_db_id');
                  console.log('clicked editUser: ' + id);
                  this.trigger('dataUser', {id: id});
              }

              else if (btn.attr('id') == 'btnSaveProfile') {
                  console.log('clicked save profile');
                  this.postProfile();
              }
          });

      });
  }

});
