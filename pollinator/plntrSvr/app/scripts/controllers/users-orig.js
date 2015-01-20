define([
    './ctrl',
    '../services/modalService'
], function(ct) {

    'use strict';

    console.log('users.js');

    var UsersCtrl = ct
        .controller('UsersCtrl', function ($scope, $rootScope, $location,
                                           $resource, $modal, $log, usersResource, $route, modalSvc) {

            console.log('UsersCtrl: ' + $location.path());

            $scope.editUser = function (id) {
                console.log("editUser id: ", id);

                usersResource.get({userId: id}).$promise.then(function (user) {
                    // success
//            console.log("usersResource.get id: ", id);
                    console.log("userResource.get");
                    $scope.user = user;
                    console.log($scope.user);

                }, function (errResponse) {
                    // fail
                    console.log("error userResource.get");
                    console.log(errResponse);
                    $rootScope.$emit('errorEvent', errResponse);
                });
            }

            usersResource.query().$promise.then(function (users) {
                // success
                console.log("usersResource.query");
                $scope.users = users;
            }, function (errResponse) {
                // fail
                console.log("error usersResource.query");
                console.log(errResponse);
                $rootScope.$emit('errorEvent', errResponse);
            });

            $scope.delUser = function (id) {
                console.log("delUser id: " + id);
                usersResource.delete({userId: id}).$promise.then(function (user) {
                    console.log("deleted");
                    $route.reload();
                });
            }

            $scope.editUser = function (id) {
//            console.log("editUser id: ", id);

                usersResource.get({userId: id}).$promise.then(function (user) {
                    // success
//            console.log("usersResource.get id: ", id);
                    console.log("userResource.get id: " + user);
                    $scope.user = user;
                    console.log($scope.user);

                    $scope.open('lg');

                }, function (errResponse) {
                    // fail
//            console.log("error usersResource.get id: ", id);
                    console.log("error userResource.get");
                    console.log(errResponse);

                    $rootScope.$emit('errorEvent', errResponse);
                });
            }

            $scope.createUser = function () {
                console.log("createUser");

                $scope.user = {};

                $scope.open('lg');

//            $rootScope.$emit('errorEvent', 'error');
//            $rootScope.$emit('warningEvent', 'warning');
//            $rootScope.$emit('infoEvent', 'success');

            }

            $scope.saveUser = function (id) {
                console.log("editUser id: ", id);
            }

            $scope.open = function (size) {

                var modalInstance = $modal.open({
                    templateUrl: 'views/userdetail.html',
                    controller: ModalInstanceCtrl,
                    size: size,
                    resolve: {
                        user: function () {
                            console.log('in resolve');
                            console.log($scope.user);
                            return $scope.user;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

        });

    var ModalInstanceCtrl = function ($scope, $rootScope, $modalInstance, user, usersResource, $route) {

        $scope.user = user;

        console.log('in ModalInstanceCtrl');

        console.log($scope.user);

        $scope.ok = function () {
            console.log('ok clicked');
            console.log($scope.user);

            if (angular.isDefined($scope.user) && angular.isDefined($scope.user._id)) {
                usersResource.save({userId: $scope.user._id}, $scope.user).$promise.then(function (res) {
                    console.log("saved");
                    console.log(res);
                    $route.reload();
                }, function (errResponse) {
                    // fail
                    console.log("error userResource.save");
                    console.log(errResponse);

                    $rootScope.$emit('errorEvent', errResponse);
                });

            }
            else {
                usersResource.create($scope.user).$promise.then(function (res) {
                    console.log("created");
                    console.log(res);
                    $route.reload();
                }, function (errResponse) {
                    // fail
                    console.log("error userResource.create");
                    console.log(errResponse);

                    $rootScope.$emit('errorEvent', errResponse);
                });
            }

            $modalInstance.close($scope.user);
        };

        $scope.cancel = function () {
            console.log('cancel clicked');
            console.log($scope.user);
            $modalInstance.dismiss('cancel');
        };
    };

    return {
        UsersCtrl: UsersCtrl,
        ModalInstanceCtrl: ModalInstanceCtrl
    };

});