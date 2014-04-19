define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var profile = require('component/profile');

    /**
   * Module exports
   */

  return defineComponent(pageSelect);

  /**
   * Module function
   */

    function pageSelect() {

     this.defaultAttrs({
         pageNavBar: '#pageNavBar',
         pageNavBarHome: '#pageNavBar-home',
         pageNavBarUsers: '#pageNavBar-users',
         pageNavBarMsgs: '#pageNavBar-messages',
         pageNavBarProf: '#pageNavBar-profile'
       });

      this.ActivateLi = function(li)
      {
          var comp = this;
          this.$node.find('li').each(function(index, element){

              if (li.is($(element)))
              {
                  console.log("activate " + index + " " + $(element).text());
                  $(element).addClass('active');

                  comp.trigger('uiPageSelectChanged', {
                      selection: $(element).text()
                  });
              }
              else {
                  console.log("deactivate " + index + " " + $(element).text());
                  $(element).removeClass('active');
              }
          });
      }

      this.ActivateLiInit = function()
      {
          var comp = this;
          this.$node.find('li').each(function(index, element){

              if ($(element).hasClass('active'))
              {
                  console.log("activate " + index + " " + $(element).text());
                  $(element).addClass('active');

                  comp.trigger('uiPageSelectChanged', {
                      selection: $(element).text()
                  });

                  return;
              }
          });
      }

      this.after('initialize', function () {
        console.log("initialize pageSelect");

          this.on(this.$node, 'click', function(e)
          {
              var li = $(e.target).closest('li');
              this.ActivateLi(li);

              if (li.is(this.select('pageNavBarProf'))) {
                  profile.attachTo('#profilePage');
              }
          });

        this.ActivateLiInit();
    });

  }

});
