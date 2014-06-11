define([
    './svc'
], function(svc) {

    'use strict';

//    console.log('modalService.js');

    return svc
        .service('modalSvc', function ($modal, $rootScope, $log) {

            $log.log('modalSvc');

            function Input(size, template, model, ctrl) {
                this.size = size;
                this.template = template;
                this.model = model;
                this.ctrl = ctrl;
            };

            this.input = function (size, template, model, ctrl) {
                return new Input(size, template, model, ctrl);
            }

            var open = function (input) {

//                $log.log(input);
//                $log.log(input.model);

                var modalInstance = $modal.open({
                    templateUrl: input.template, //'views/userdetail.html',
                    controller: input.ctrl,
                    size: input.size,
                    resolve: input.model
                });

            };

            this.openModal = function(input)
            {
//                $log.log('openModal');
                open(input);
            }

            $rootScope.$on('openModal', function (event, input) {
//                $log.log("openModal triggered");
                open(input);
            });

            $rootScope.$on('dismissModal', function () {
                $modalInstance.dismiss('cancel');
            });

        });

});
