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
         pageNavBarHome: '#pageNavBar-home',
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

        this.on(this.select('pageNavBarMsgs'), 'click', function()
        {
            this.ActivateLi(this.select('pageNavBarMsgs'));
        });

        this.on(this.select('pageNavBarHome'), 'click', function()
        {
            this.ActivateLi(this.select('pageNavBarHome'));
        });

        this.on(this.select('pageNavBarProf'), 'click', function()
        {
            this.ActivateLi(this.select('pageNavBarProf'));
            profile.attachTo('#profilePage');
        });

        this.ActivateLiInit();
    });

  }

});
