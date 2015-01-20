// Karma configuration
// Generated on Wed Apr 30 2014 08:32:37 GMT-0400 (EDT)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'app/js/**/*.js', included: false},
            {pattern: 'test/spec/**/*.spec.js', included: false},
            {pattern: 'app/bower_components/flight/lib/*.js', included: false},
            {pattern: 'app/bower_components/underscore/*.js', included: false},

            {pattern: 'app/bower_components/jquery/dist/*.js', included: true},
            {pattern: 'app/bower_components/jasmine-jquery/lib/*.js', included: true},
            {pattern: 'app/bower_components/jasmine-flight/lib/*.js', included: true},

            'test-main.js'
        ],

        // list of files to exclude
        exclude: [
            'app/js/main.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};