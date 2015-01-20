define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(home);

  /**
   * Module function
   */

  function home() {
    this.defaultAttrs({

    });

      this.render = function(name)
      {
              var renderedTemplate = templates[name].render({name: name});
              this.$node.html(renderedTemplate);
      }

      this.activate = function()
      {
          console.log('activate home page');
          this.render('Home');
          this.$node.show();
      }

      this.deactivate = function()
      {
          console.log('deactivate home page');
          this.$node.hide();
      }

      this.after('initialize', function () {
        console.log('initialize home comp');
        this.on(document,"uiActivateHomePage", this.activate);
        this.on(document,"uiDeactivateHomePage", this.deactivate);
    });
  }

});
