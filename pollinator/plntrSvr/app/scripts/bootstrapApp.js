/**
  * bootstraps angular onto the window.document node
*/
define([
    'require',
    'angular',
    './routes'
], function (require, ng) {

    'use strict';

//    console.log('bootstrapApp.js');

    return require(['domReady!'], function (document) {
             ng.bootstrap(document, ['appModule']);
             });
    });