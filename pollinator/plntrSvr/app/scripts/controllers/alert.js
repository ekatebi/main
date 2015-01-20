define([
    './ctrl'
    ], function(ct) {

    'use strict';

//    console.log('alert.js');

    return ct
        .controller('AlertCtrl', function ($scope, $rootScope, $log) {

            $log.log('AlertCtrl');

            $scope.alerts = [];

            /*
             [
             { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
             { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
             ];
             */

//        console.log($scope.alerts[0].msg);

            $scope.addAlert = function (alert) {
                $scope.alerts.push({msg: alert.msg, type: alert.type});
            };

            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

            $rootScope.$on('alertEvent', function (event, alert) {
                $scope.addAlert(alert);
            });

            $rootScope.$on('errorEvent', function (event, msg) {
                $scope.addAlert({msg: msg, type: 'danger'});
            });

            $rootScope.$on('warningEvent', function (event, msg) {
                $scope.addAlert({msg: msg, type: 'warning'});
            });

            $rootScope.$on('infoEvent', function (event, msg) {
                $scope.addAlert({msg: msg, type: 'success'});
            });
        });
});
