app.controller("BranchCreateController", ["$scope", "$http", "appMessage", function BranchCreateController($scope, $http, appMessage) {

  
    //================= GLOBAL VARIABLE ===================

    $scope.Branch = {};
    $scope.alerts = [];
    $scope.appMessage = appMessage;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


    //============================TypeAhead==================

    $scope.SaveBranch = function () {

        $http({
            method: "POST",
            url: "Save",
            data: $scope.Branch
        }).success(function mySucces(response) {
            if (response.Success) {
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                $scope.Branch = {};
            }
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

}]);