app.controller("UmrahListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredUmrah = [];
    $scope.DataList = [];
    $scope.UmrahInfos = [];
    $scope.showItems = [10, 25, 50, 100];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllUmrah = function () {
        //$scope.employees = [];

        $http({
            method: "Get",
            url: "/Hajj/Umrah/GetAllUmrah"

        }).success(function (response) {
            $scope.UmrahInfos = response;
            $scope.DataList = response;
            $scope.figureOutUmrahToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllUmrah();

    $scope.figureOutUmrahToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredUmrah = $scope.UmrahInfos.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutUmrahToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.UmrahInfos, $scope.searchText);
        $scope.figureOutUmrahToDisplay();
    };


}]);