define([
    './ctrl'
], function(ct) {

    'use strict';

//    console.log('main.js');

    return ct
        .controller('MainCtrl', function ($scope, $location, $log) {

            $log.log('MainCtrl: ' + $location.path());

        });
});
