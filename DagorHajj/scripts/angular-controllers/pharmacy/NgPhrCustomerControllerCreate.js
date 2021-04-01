app.controller("NgPhrCustomerControllerCreate", function ($scope, $http) {

    $scope.Customer = {};
    $scope.alerts = [];


    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.SaveCustomer = function () {
        $http({
            method: "POST",
            url: "SaveCustomer",
            data: $scope.Customer

        }).success(function mySucces(response) {
            $scope.alerts.push({ 'type': 'success', 'msg': 'Data Inserted Successfully.' });

            $scope.Customer = {};

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data Saving Failure!.' });
        });
    };

});