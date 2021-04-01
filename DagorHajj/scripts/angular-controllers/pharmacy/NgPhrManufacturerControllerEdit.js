app.controller("NgPhrManufacturerControllerEdit", function ($scope, $http) {

    //================= GLOBAL VARIABLE ===================

    $scope.manufacturer = {};
    $scope.alerts = [];


    // Set Order Id While Update this Id

    var paramId = location.search.substr(4);

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


    $scope.GetManufacturerById = function () {
        $http({
            method: "POST",
            url: "/PhrManufacturer/GetManufacturerById?Id=" + (paramId)

        }).success(function mySucces(response) {

            $scope.manufacturer = response;
        }).error(function myError(response) {


        });
    };


    // It will post the form data on Server
    $scope.SaveManufacturer = function () {

        $http({
            method: "POST",
            url: "/PhrManufacturer/SaveManufacturer",
            data: $scope.manufacturer

        }).success(function mySucces(response) {
            $scope.alerts.push({ 'type': 'success', 'msg': 'Data Updated Successfully.' });
            $scope.manufacturer = {};

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data Saving Failure!.' });
        });
    }




    //=========Call The Method When Param Value is not = 0
    if (paramId != "") {
        $scope.GetManufacturerById();

    }

});