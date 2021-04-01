app.controller("AdminSystemUserListController", ["$scope", "$http", "appMessage", '$filter', function ($scope, $http, appMessage, $filter) {

    //================= GLOBAL VARIABLE ===================

    $scope.appMessage = appMessage;
    $scope.Users = [];
    $scope.filteredUsers = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.alerts = [];

    //=========================== Alerts ==================
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.GetAllUsers = function () {
        $http({
            method: "Get",
            url: "/Hajj/UserAdmin/GetAllUsers"
        }).success(function mySucces(response) {
            $scope.Users = response.users;
            $scope.DataList = response.users;
            $scope.figureOutUserToDisplay();
        }).error(function myError(response) {

        });
    };

    $scope.figureOutUserToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredUsers = $scope.DataList.slice(begin, end);
    };

    $scope.pageChanged = function () {
        $scope.figureOutUserToDisplay();
    };

    $scope.searchFromList = function () {
        $scope.DataList = $filter('filter')($scope.Users, $scope.searchText);
        $scope.figureOutUserToDisplay();
    };

    $scope.GetAllUsers();
}]);