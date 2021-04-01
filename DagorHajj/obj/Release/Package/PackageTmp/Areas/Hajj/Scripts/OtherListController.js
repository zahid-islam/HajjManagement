app.controller("OtherListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredOther = [];
    $scope.DataList = [];
    $scope.OtherInfo = [];
    $scope.showItems = [10, 25, 50, 100];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllOther = function () {

        $http({
            method: "Get",
            url: "/Hajj/Others/GetAllOther"

        }).success(function (response) {

            $scope.OtherInfo = response;
            $scope.DataList = response;
            $scope.figureOutOtherToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;            
        });
    };
    $scope.GetAllOther();

    $scope.figureOutOtherToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredOther = $scope.OtherInfo.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutOtherToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scopeOtherInfo, $scope.searchText);
        $scope.figureOutOtherToDisplay();
    };

}]);