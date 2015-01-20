
'use strict';

describeComponent('component/users', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });


  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should do something');

/*
    it('should listen to uiNeedsExampleData and trigger dataExample', function () {
        var dataExample = spyOnEvent(document, 'dataExample');
        this.component.$node.trigger('uiNeedsExampleData');
        expect(dataExample).toHaveBeenTriggeredOn(document);
        expect(dataExample.mostRecentCall.data).toEqual({
            example: 'foobar'
        });
    });
*/

});
