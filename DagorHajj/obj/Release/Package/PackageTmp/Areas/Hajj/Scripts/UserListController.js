app.controller("UserListController", ['$scope', '$http', '$filter', 'appMessage', function ($scope, $http, $filter, appMessage) {

    $scope.appMessage = appMessage;
    $scope.filteredUser = [];
    $scope.DataList = [];
    $scope.UserInfos = [];
    $scope.showItems = [10, 25, 50, 100];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.counter = 0;

    $scope.GetAllUser = function () {
        //$scope.employees = [];

        $http({
            method: "Get",
            url: "/Hajj/User/GetAllUser"

        }).success(function (response) {

            $scope.UserInfos = response;
            $scope.DataList = response;
            $scope.figureOutUserToDisplay();

        }).error(function myError(response) {

            $scope.errors = response.data;
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

        });
    };
    $scope.GetAllUser();

    $scope.figureOutUserToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredUser = $scope.UserInfos.slice(begin, end);
    };




    $scope.pageChanged = function () {
        $scope.figureOutUserToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.UserInfos, $scope.searchText);
        $scope.figureOutUserToDisplay();
    };


}]);