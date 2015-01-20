define([
    './svc'
], function(sv) {

    'use strict';

//    console.log('resourceService.js');

    return sv
        .service('resourceSvc', function ($resource, $rootScope, $log) {

           $log.log('resourceSvc');

           var input = {
                  resource: null,
                  verb: null,
                  params: null,
                  data: null,
                  event: null
                };

            function Input(resource, verb, params, data, event) {
                this.resource = resource;
                this.verb = verb;
                this.params = params;
                this.data = data;
                this.event = event;
            };

            this.input = function(resource, verb, params, data, event) {
                return new Input(resource, verb, params, data, event);
            }

            var userResource = $resource('/users/:userId', {userId: '@_id'},
                {
                    get: {method: "GET", isArray: false},
                    create: {method: "POST"},
                    save: {method: "PUT"},
                    delete: {method: "DELETE"}
                });

            var resources = new Object(); // or just {}

            resources['user'] = userResource;

            var getResource = function(key) {

//                $log.log(key);

                for (var k in resources) {

//                    $log.log('k: ' + k);

                    if (k == key && resources.hasOwnProperty(k)) {

                        var r = resources[k]

//                        $log.log(r);

                        return r;
                    }
                }

                $rootScope.$emit('errorEvent', "resource not found for " + key);

                return null;
            }

            var action = function(input) {

                var key = input.resource;

                var res = getResource(key);

                if (angular.isDefined(res)) {

//                    $log.log('input.params: ');
//                    $log.log(input.params);

                    res[input.verb](input.params, input.data).$promise.then(function (output) {
                        // success
                        $rootScope.$emit(input.event, output);

                    }, function (errResponse) {
                        // fail
                        $rootScope.$emit('errorEvent', errResponse);
                    });
                }
             }

            this.resourceAction = function(input) {
                action(input);
            }

            $rootScope.$on("resourceAction", function(event, input) {
                action(input);
            });

        });

});
