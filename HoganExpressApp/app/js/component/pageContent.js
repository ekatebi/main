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
//        content: "#pageContent",
//        HomeParent: "#HomeParent",
//        ProfileParent: "#ProfileParent",
//        MessagesParent: "#MessagesParent"
    });

      this.render = function(NameOfTemplate, parameters) {

          console.log("render: " + NameOfTemplate);
          console.log(parameters);

//              var NameOfTemplate = 'user';
//              var parameters = {name: 'Ed', hobby: 'Tennis' };

          var renderedTemplate = templates[NameOfTemplate].render(parameters);

// -> 'I am <em>Hulk</em>, I like Wrestling!';

//          $('#pageContent').html(renderedTemplate);

          var divId = "#"+NameOfTemplate+"Parent";

          console.log("render: " + divId);

          $(divId).html(renderedTemplate);
      }

      this.ShowSelectedPage = function(name)
      {
            console.log("ShowSelection: " + name + " chilren count: " + this.$node.children().length);

            var comp = this;

            this.$node.children().each(function(index, element){

//                var theName = '[name=' + name + "PageName]";
//                if ($(element).is($(theName)))
                var id = name + "Page";
                if ($(element).is($('#' + id)))
                {
                    //uiActivateUsersPage
                    var eventName = 'ui' + 'Activate' + $(element).attr('id');
                    console.log('trigger: ' + eventName +  ' - ' + $(element).attr('id') );
                    comp.trigger(eventName);

                }
                else
                {
                    //uiDeactivateUsersPage
                    var eventName = 'ui' + 'Deactivate' + $(element).attr('id');
                    console.log('trigger: ' + eventName +  ' - ' + $(element).attr('id') );
                    comp.trigger(eventName);
                }
            });
        }

        this.onPageSelectChanged = function (e, data)
        {
          this.ShowSelectedPage(data.selection);
        }

      this.after('initialize', function () {
          console.log("initialize pageContent");
          this.on(document, 'uiPageSelectChanged', this.onPageSelectChanged);
    });
  }

});
