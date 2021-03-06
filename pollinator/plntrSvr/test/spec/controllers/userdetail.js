'use strict';

describe('Controller: UserdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('plntrSvrApp'));

  var UserdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserdetailCtrl = $controller('UserdetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
