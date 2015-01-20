define([
    './app',
    './controllers/alert',
    './controllers/header',
    './controllers/main',
    './controllers/users',
    './controllers/about',
    './controllers/contact'
], function (app) {

    'use strict';

//    console.log('route.js');

    return app
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/users', {
                    templateUrl: 'views/users.html',
                    controller: 'UsersCtrl'
                })
                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    controller: 'ContactCtrl'
                })
                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                })

        }]);
});
