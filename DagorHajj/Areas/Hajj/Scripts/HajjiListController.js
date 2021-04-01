app.controller("HajjiListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredHajji = [];
    $scope.DataList = [];
    $scope.HajjiInfos = [];
    $scope.showItems = [10, 25, 50, 100];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllHajji = function () {

        $http({
            method: "Get",
            url: "/Hajj/Hajji/GetAllHajji"

        }).success(function (response) {

            $scope.HajjiInfos = response;
            $scope.DataList = response;
            $scope.figureOutHajjiToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllHajji();

    $scope.figureOutHajjiToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredHajji = $scope.HajjiInfos.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutHajjiToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.HajjiInfos, $scope.searchText);
        $scope.figureOutHajjiToDisplay();
    };


}]);