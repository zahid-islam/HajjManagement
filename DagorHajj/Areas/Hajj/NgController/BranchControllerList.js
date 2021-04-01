app.controller("BranchControllerList", ["$scope", "$http", "appMessage", function ($scope, $http, appMessage) {

    //================= GLOBAL VARIABLE ===================

    $scope.appMessage = appMessage;
    $scope.Branches = [];
    $scope.filteredBranches = [];
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.alerts = [];

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.GetBranches = function () {

        $http({
            method: "POST",
            url: "GetAllBranches"

        }).success(function mySucces(response) {

            $scope.Branches = response;
            $scope.figureOutBranchToDisplay();

        }).error(function myError(response) {

        });
    };


    $scope.figureOutBranchToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredBranches = $scope.Branches.slice(begin, end);
    };


    $scope.pageChanged = function () {
        $scope.figureOutBranchToDisplay();
    };


    $scope.GetBranches();

}]);