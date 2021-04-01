var personApp = angular.module('personApp', []);
personApp.controller('testController', ['$scope', function ($scope) {
    $scope.name = 'Mary Jane';
}]);