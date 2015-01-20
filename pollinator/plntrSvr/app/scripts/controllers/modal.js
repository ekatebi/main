define([
    '../app',
    '../services/resourceService'
], function(app) {

    'use strict';

    console.log('modal.js');

    return app
        .service('ModalSvc', function ($scope, $rootscope, $modal, $log, resourceSvc) {

        $log.log('ModalSvc');

        $rootScope.$on('openModal', function (event, input) {
            $scope.input = input;
            $scope.open();
        });

        function Input(size, template, model, resource, params) {
            this.size = size;
            this.template = template;
            this.model = model;
            this.resource = resource;
            this.params = params;
        };

        var input = function(size, template, model, resource, params) {
            new Input(size, template, model, resource, params);
        }

        $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: $scope.input.template, //'views/userdetail.html',
            controller: ModalInstanceCtrl,
            size: $scope.data.size,
            resolve: {
                model: function () {
                    $log.log('in resolve');
                    $log.log($scope.user);
                    return $scope.input.model;
                }
            }
        });

        modalInstance.result.then(function (model) {
            $scope.input.model = model;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    var ModalInstanceCtrl = function ($scope, $rootScope, $modalInstance, user, resourceService, $route, $log) {

        $scope.input.model = model;

        $log.log('in ModalInstanceCtrl');

        $log.log($scope.input.model);

        $scope.ok = function () {
            $log.log('ok clicked');
            $log.log($scope.input.model);

            if (angular.isDefined($scope.input.model) && angular.isDefined($scope.input.model._id)) {

                $rootScope.emit("resourceAction", {
                    resource: input.resource,
                    verb: 'save',
                    params: input.params,
                    model: input.model
                });

                usersResource.save({userId: $scope.user._id}, $scope.user).$promise.then(function (res) {
                    $log.log("saved");
                    $log.log(res);
                    $route.reload();
                }, function (errResponse) {
                    // fail
                    $log.log("error userResource.save");
                    $log.log(errResponse);

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


        });

});
