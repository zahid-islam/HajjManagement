app.controller("RoleListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredRole = [];
    $scope.DataList = [];
    $scope.RoleInfos = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllRole = function () {
        //$scope.employees = [];

        $http({
            method: "Get",
            url: "/Hajj/Role/GetAllRole"

        }).success(function (response) {

            $scope.RoleInfos = response;
            $scope.DataList = response;
            $scope.figureOutRoleToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllRole();

    $scope.figureOutRoleToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredRole = $scope.RoleInfos.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutRoleToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.RoleInfos, $scope.searchText);
        $scope.figureOutRoleToDisplay();
    };


}]);