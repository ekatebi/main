define([
    'angular',
    'angular-resource'
], function(ng) {

    'use strict';

    console.log('services.js');

    return ng.module('usersServices', ['ngResource'])
        .factory('usersResource', ['$resource',
            function ($resource) {

                /*
                 return $resource('phones/:phoneId.json', {}, {
                 query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
                 });
                 */

                return $resource('/users/:userId', {userId: '@_id'},
                    {
                        get: {method: "GET", isArray: false},
                        create: {method: "POST"},
                        save: {method: "PUT"},
                        delete: {method: "DELETE"}
                    });

            }]);
});
