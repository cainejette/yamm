'use strict';

angular.module('yamm', [
  'ngRoute',
  'yamm.view1'
  ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
