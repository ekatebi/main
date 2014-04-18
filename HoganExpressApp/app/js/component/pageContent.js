define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(pageContent);

  /**
   * Module function
   */

//  var templates = require('js/templates');

    function pageContent() {
    this.defaultAttrs({
        content: "#content"
    });

      this.render = function(NameOfTemplate, parameters) {

          console.log("render: " + NameOfTemplate);
          console.log(parameters);

//              var NameOfTemplate = 'user';
//              var parameters = {name: 'Ed', hobby: 'Tennis' };

          var renderedTemplate = templates[NameOfTemplate].render(parameters);

// -> 'I am <em>Hulk</em>, I like Wrestling!';

          $('#pageContent').html(renderedTemplate);
      }

      this.onPageSelectChanged = function (e, data) {

          console.log("uiPageSelectChanged fired!!!");
          console.log(data);

//          this.$node.text(data.val);

          this.render(data.selection, {name: data.selection});

      };

      this.after('initialize', function () {
          console.log("initialize pageContent");
        this.on(document, 'uiPageSelectChanged', this.onPageSelectChanged);
    });
  }

});
