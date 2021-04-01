app.controller("NgPhrManufacturerControllerCreate", function ($scope, $http) {

    $scope.manufacturer = {};
    $scope.alerts = [];


    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
 
    $scope.SaveManufacturer = function () {

        $http({
            method: "POST",
            url: "/PhrManufacturer/SaveManufacturer",
            data: $scope.manufacturer

        }).success(function mySucces(response) {
            $scope.alerts.push({ 'type': 'success', 'msg': 'Data Inserted Successfully.' });
            $scope.manufacturer = {};

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data Saving Failure!.' });
        });
    }

});