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

      this.initForm = function()
      {
          var NameOfTemplate = 'Profile';
          var parameters = {firstName: 'Ed', lastName: 'Katebi', phone: '(978) 855-2991', email: 'ekatebi@gmail.com' };
          var renderedTemplate = templates[NameOfTemplate].render(parameters);

// -> 'I am <em>Hulk</em>, I like Wrestling!';

          $('#profilePage').html(renderedTemplate);
//          this.select('profilePage').html(renderedTemplate);
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
                          alert("success");
                      },
                      500: function () {
                              alert("server exception");
                      }
                  }
              }
          );
      };

    this.after('initialize', function () {
        this.initForm();
        this.on(this.select('saveButtonId'),'click', this.onSaveClick);
    });
  }

});
