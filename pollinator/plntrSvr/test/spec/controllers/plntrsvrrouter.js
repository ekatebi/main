'use strict';

describe('Controller: PlntrsvrrouterCtrl', function () {

  // load the controller's module
  beforeEach(module('plntrSvrApp'));

  var PlntrsvrrouterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlntrsvrrouterCtrl = $controller('PlntrsvrrouterCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
