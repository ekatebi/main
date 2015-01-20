require.config({

//   baseUrl: 'scripts',

    paths: {
        'domReady': '../bower_components/requirejs-domready/domReady',
        'angular': "../bower_components/angular/angular",
        "angular-animate": "../bower_components/angular-animate/angular-animate",
        "angular-bootstrap": "../bower_components/angular-bootstrap/ui-bootstrap-tpls",
        "angular-mocks": "../bower_components/angular-mocks/angular-mocks",
        "angular-resource": "../bower_components/angular-resource/angular-resource",
        "angular-route": "../bower_components/angular-route/angular-route",
        "angular-scenario": "../bower_components/angular-scenario/angular-scenario",
        'bootstrap': "../bower_components/bootstrap/dist/js/bootstrap",
        "es5-shim": "../bower_components/es5-shim/es5-shim",
        'jquery': "../bower_components/jquery/dist/jquery",
        'json3': "../bower_components/json3/lib/json3.min"
    },

    shim: {

        'bootstrap': {
            deps: ["jquery"],
        },

        'angular': {
            exports: 'angular'
        },

        'angular-route': {
            exports: 'angular-route'
        },

        'angular-resource': {
            exports: 'angular-resource'
        },

        'angular-bootstrap': {
            exports: 'angular-bootstrap',
            deps: ["angular"]
        }
    },

    // kick start application
    deps: ['./bootstrapApp']

});
