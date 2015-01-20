define(function (require) {

    'use strict';

    /**
     * Module dependencies
     */

    var defineComponent = require('flight/lib/component');

    /**
     * Module exports
     */

    return defineComponent(input);

    /**
     * Module function
     */

    function input() {

        this.onKeyup = function() {

//          console.log("onKeyup");

            this.trigger('inputChange', {
                val: this.$node.val()
            });

        };

        /*    this.defaultAttrs({

         });
         */
        this.after('initialize', function () {
            this.on('keyup', this.onKeyup);
        });

    }

});
