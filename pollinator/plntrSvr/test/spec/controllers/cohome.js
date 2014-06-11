'use strict';

describe('Controller: CohomeCtrl', function () {

  // load the controller's module
  beforeEach(module('plntrSvrApp'));

  var CohomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CohomeCtrl = $controller('CohomeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
