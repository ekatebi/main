define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(messages);

  /**
   * Module function
   */

  function messages() {
    this.defaultAttrs({

    });

      this.render = function(name)
      {
          var renderedTemplate = templates[name].render({name: name});
          this.$node.html(renderedTemplate);
      }

      this.activate = function()
      {
          console.log('activate messages page');
          this.render('Messages');
          this.$node.show();
      }

      this.deactivate = function()
      {
          console.log('deactivate messages page');
          this.$node.hide();
      }

    this.after('initialize', function () {
        console.log('initialize messages comp');
        this.on(document,"uiActivateMessagesPage", this.activate);
        this.on(document,"uiDeactivateMessagesPage", this.deactivate);
    });
  }

});
