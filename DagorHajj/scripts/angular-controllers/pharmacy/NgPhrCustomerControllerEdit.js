app.controller("NgPhrCustomerControllerEdit", function ($scope, $http) {

    //================= GLOBAL VARIABLE ===================

    $scope.Customer = {};
    $scope.alerts = [];


    // Set Order Id While Update this Id

    var paramId = location.search.substr(4);
    $scope.Customer.Id = paramId;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


    //=================COMBO DATA============
    $scope.GetStores = function () {

        $http({
            method: "POST",
            url: "/PhrStore/GetStores"

        }).success(function mySucces(response) {

            $scope.stores = response;

        }).error(function myError(response) {

            $scope.errors = response.data;

        });
    }

    $scope.GetCustomerById = function () {
        $http({
            method: "POST",
            url: "/PhrCustomer/GetCustomer?Id=" + ($scope.Customer.Id)

        }).success(function mySucces(response) {
            $scope.Customer = response;
        }).error(function myError(response) {
            $scope.errors = response.data;
        });
    }


    // It will post the form data on Server
    $scope.SaveCustomer = function () {
        $http({
            method: "POST",
            url: "/PhrCustomer/SaveCustomer",
            data: $scope.Customer

        }).success(function mySucces(response) {
            $scope.alerts.push({ 'type': 'success', 'msg': 'Data updated Successfully.' });

            $scope.Customer = {};

        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data Update Failure!.' });
        });
    };


    $scope.GetStores();


    //=========Call The Method When Param Value is not = 0
    if (paramId != "") {
        $scope.GetCustomerById();

    }

});