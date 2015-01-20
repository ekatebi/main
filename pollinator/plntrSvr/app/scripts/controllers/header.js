define([
    './ctrl'
], function(ct) {

    'use strict';

//    console.log('header.js');

    return ct
        .controller('HeaderCtrl', function ($scope, $location, $log) {

            $log.log('HeaderCtrl: ' + $location.path());

            $scope.isActive = function (viewLocation) {

                var active = (viewLocation === $location.path());

//            console.log('HeaderCtrl isActive: ' + active  + ' ' + viewLocation);

                return active;
            };

        });
});
