app.controller('DashboardController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
    $scope.Hajj = {};
    $scope.Hajjes = [];
    $scope.Umrahes = [];

    $scope.DashBoardInfo = {};

    $scope.GetAllDashBoardInfo = function () {
        $http({
            method: "GET",
            url: "Home/GetAllDashBoardInfo"
        }).success(function (response) {
            $scope.DashBoardInfo = response;
            $scope.DashBoardInfo.Year = (new Date()).getFullYear();
            $scope.DashBoardInfo.LastYear = (new Date()).getFullYear() - 1;
            $scope.DashBoardInfo.NextYear = (new Date()).getFullYear() + 1;
        }).error(function (response) {

        });
    };
    $scope.GetAllDashBoardInfo();
}]);