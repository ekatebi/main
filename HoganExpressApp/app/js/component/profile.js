define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(profile);

  /**
   * Module function
   */

  function profile() {

      this.defaultAttrs({
          saveButtonId: '#saveButtonId',
          formElement: 'form',
          profilePage: '#profilePage'
      });

      this.render = function(parameters)
      {
          var NameOfTemplate = 'ProfileModalEx';
          var renderedTemplate = templates[NameOfTemplate].render(parameters);

          this.$node.html(renderedTemplate);

          var options = {
              "backdrop" : "static"
          }

          $('#profilePage').modal(options);

      }

      this.onSaveClick = function() {

          console.log("onclick save profile");
          console.log(this.select('formElement').serialize());
          console.log(this.select('formElement').serializeArray());

          var postVal = JSON.stringify(this.select('formElement').serializeArray());
          var postVal2 = this.select('formElement').serializeArray();
          console.log(postVal);

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
      };

      this.activate = function()
      {
          console.log('activate profile page');
          var parameters = {firstName: 'Ed', lastName: 'Katebi', phone: '(978) 855-2991', email: 'ekatebi@gmail.com' };
          this.render(parameters);
          this.$node.show();
      }

      this.deactivate = function()
      {
          console.log('deactivate profile page');
          this.$node.hide();
      }

    this.after('initialize', function () {
//        this.render(null);
        this.on(document,"uiActivateProfilePage", this.activate);
        this.on(document,"uiDeactivateProfilePage", this.deactivate);
        this.on(this.select('saveButtonId'),'click', this.onSaveClick);
    });
  }

});
