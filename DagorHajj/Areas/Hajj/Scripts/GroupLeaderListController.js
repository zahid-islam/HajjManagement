app.controller("ngGroupLeaderListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredGroupLeader = [];
    $scope.DataList = [];
    $scope.GroupLeaderInfos = [];
    $scope.showItems = [10, 25, 50, 100];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllGroupLeader = function () {
        //$scope.employees = [];

        $http({
            method: "Get",
            url: "/Hajj/GroupLeader/GetAllGroupLeader"

        }).success(function (response) {

            $scope.GroupLeaderInfos = response;           
            $scope.DataList = response;
            $scope.figureOutGroupLeaderToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllGroupLeader();

    $scope.figureOutGroupLeaderToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredGroupLeader = $scope.GroupLeaderInfos.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutGroupLeaderToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.GroupLeaderInfos, $scope.searchText);
        $scope.figureOutGroupLeaderToDisplay();
    };


}]);