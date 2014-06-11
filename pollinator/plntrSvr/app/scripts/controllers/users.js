define([
    './ctrl',
    '../services/resourceService',
    '../services/modalService'
], function(ct) {

    'use strict';

//    console.log('users.js');

    var UsersCtrl = ct
        .controller('UsersCtrl', function ($scope, $rootScope, $location,
                                           $log, $route, resourceSvc, modalSvc) {

            $log.log('UsersCtrl: ' + $location.path());

            $rootScope.$on('UsersCtrl-editUser', function(event, user) {
                $scope.user = user;
//                $log.log($scope.user);

                var model = {
                    user: function () {
                        return $scope.user;
                    }
                }

//            $rootScope.$emit('openModal',
                modalSvc.openModal(
                    modalSvc.input('lg', 'views/userdetail.html', model, ModalInstanceCtrl));

            });

            var getUsers = function() {

//                $rootScope.$emit('resourceAction',
                resourceSvc.resourceAction(
                    resourceSvc.input('user', 'query', null, null, 'UsersCtrl-getUsers'));


            }

            getUsers();

            $rootScope.$on('UsersCtrl-getUsers', function(event, users) {
                $scope.users = users;
            });

            $rootScope.$on('UsersCtrl-getUsers2', function(event, data) {
                getUsers();
            });

            $rootScope.$on('UsersCtrl-delUser', function(event, user) {
//                $route.reload();

                $scope.$emit('UsersCtrl-getUsers');
            });

            $scope.delUser = function (id) {

                console.log("delUser id: " + id);

//                $rootScope.$emit('resourceAction',
                resourceSvc.resourceAction(
                    resourceSvc.input('user','delete', {userId: id}, null, 'UsersCtrl-getUsers2'));

            }

            $scope.editUser = function (id) {

                $log.log("editUser id: ", id);

//                $rootScope.$emit('resourceAction',
                resourceSvc.resourceAction(
                    resourceSvc.input('user','get', {userId: id}, null,'UsersCtrl-editUser'));

            }

            $scope.createUser = function () {
                $log.log("createUser");

                $scope.user = {};

                var model = {
                    user: function () {
                        return $scope.user;
                    }
                }

//                $rootScope.$emit('openModal',
                    modalSvc.openModal(
                    modalSvc.input('lg', 'views/userdetail.html', model, ModalInstanceCtrl));

//            $rootScope.$emit('errorEvent', 'error');
//            $rootScope.$emit('warningEvent', 'warning');
//            $rootScope.$emit('infoEvent', 'success');

            }

        });

        var ModalInstanceCtrl = function ($scope, $rootScope, $modalInstance, user, resourceSvc, $route, $log) {

//            $log.log(user);

            $scope.user = user;

            $log.log($scope.user);

            $scope.ok = function () {

                $log.log('ok clicked');
                $log.log($scope.user);

                if (angular.isDefined($scope.user) && angular.isDefined($scope.user._id)) {
                    $log.log('save');
//                    $rootScope.$emit('resourceAction',
                    resourceSvc.resourceAction(
                        resourceSvc.input('user','save', {userId: $scope.user._id}, $scope.user, 'UsersCtrl-getUsers2'));

                }
                else {
                    $log.log('create');
//                    $rootScope.$emit('resourceAction',
                    resourceSvc.resourceAction(
                        resourceSvc.input('user','create', null, $scope.user, 'UsersCtrl-getUsers2'));

                }

                $modalInstance.dismiss('ok');
            }

            $scope.cancel = function () {
                $log.log('cancel clicked');
                $log.log($scope.user);
                $modalInstance.dismiss('cancel');
            }

        }

        return {
            UsersCtrl: UsersCtrl,
            ModalInstanceCtrl: ModalInstanceCtrl
        };

});