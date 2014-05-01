'use strict';

describeComponent('component/dataUsers', function () {

  // Initialize the component and attach it to the DOM
  /*
    beforeEach(function () {
    setupComponent();
  });
  */

  it('should be defined', function () {
      setupComponent();
      expect(this.component).toBeDefined();
     /*
    var a = 2;
    var b = 2;
      expect(a).toEqual(b);
      */
  });

  it('should do something');

    describe('Initialization', function () {
        it('triggers dataItems with the initial todo items', function () {
            var eventSpy = spyOnEvent(document, 'dataItems');
            setupComponent({ todoItems: ["old item"] });

            expect(eventSpy).toHaveBeenTriggeredOnAndWith(document, {
                items: ["old item"]
            });
        });
    });

    describe('Listens to dataUsersAddUpdate', function () {
        it('and triggers dataUsersChanged', function () {
            var eventSpy = spyOnEvent(document, 'dataUsersChanged');
            setupComponent({ testMode: true });
            this.component.trigger('dataUsersAddUpdate', {firstname: "testname"});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
        });
    });

    describe('Listens to dataUsersAddUpdate', function () {
        it('and triggers dataUserError', function () {
            var eventSpy = spyOnEvent(document, 'dataUserError');
            setupComponent({ testMode: true, forceError: true });
            this.component.trigger('dataUsersAddUpdate', {firstname: "testname"});
            expect(eventSpy).toHaveBeenTriggeredOnAndWith(document, {msg: 'test error message'});
        });
    });

});
