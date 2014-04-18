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
          saveButtonId: '#saveButtonId'
      });

      this.onclick = function() {

          console.log("onclick save profile");

      };

    this.after('initialize', function () {
        this.on(this.select('saveButtonId'),'click', this.onclick);
    });
  }

});
