app.controller('ModalHajjCtrl', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.Grouopleadr = [];
    $scope.AllHajjis = [];
    $scope.alerts = [];
    $scope.DateTime = $filter('date')(Date.now(), 'dd-MM-yyyy');

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.OnSelectUser = function (val) {
        $scope.UserId = val.ID;
    };
    $scope.OnSelectGroupLeader = function (val) {
        $scope.groupLeaderId = val.ID;
    };

    $scope.GroupLeader = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/GroupLeader"
        }).success(function (response) {
            $scope.Grouopleadr = response;
        }).error(function (response) {
            
        });
    };
    $scope.GroupLeader();

    $scope.AllHajji = function () {
        $http({
            method: "GET",
            url: "/Hajj/Reports/AllHajji"
        }).success(function (response) {
            $scope.AllHajjis = response;
        }).error(function (response) {

        });
    };
    $scope.AllHajji();

}]);