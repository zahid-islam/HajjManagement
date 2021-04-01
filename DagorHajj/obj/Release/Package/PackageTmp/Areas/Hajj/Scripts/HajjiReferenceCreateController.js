app.controller('HajjiReferenceCreateCtrl', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.Contract = {};
    $scope.HajjiReferenceList = [];
    $scope.GroupLeaderList = [];
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.Contract.ID = 0;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);


    $scope.SelectHajjiRef = function (Val) {

        $scope.Contract.HajjiID = Val.ID;

    }

    $scope.SelectgroupLeader = function (Val) {

        $scope.Contract.GroupLeaderID = Val.ID;

    }
    //===================== Save Group Leader Data ===============

    $scope.SaveHajjiReference = function () {

        var url = "";

        url = "/Hajj/HajjiReference/SaveHajjiReference";


        $http({
            method: "POST",
            url: url,
            data: $scope.Contract

        }).success(function (response) {

            if (response.Success == true) {

                $scope.submitted = false;

                $scope.Contract.ID = response.Id;

                $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
            }
            else {
                $scope.submitted = false;
                $scope.Contract.ID = response.Id;
                $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
            }
        }).error(function (response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.GetAllHajji = function () {
        $http({
            method: "GET",
            url: "/Hajj/HajjiReference/GetAllHajji"
        }).success(function (response) {
            $scope.HajjiReferenceList = response;
        }).error(function () {

        });
    };
    $scope.GetAllHajji();

    $scope.GetAllGroupLeader = function () {
        $http({
            method: "GET",
            url: "/Hajj/HajjiReference/GetAllGroupLeader"
        }).success(function (response) {
            $scope.GroupLeaderList = response;
        }).error(function () {

        });
    };

    $scope.GetAllGroupLeader();

    $scope.GetHajjiReferenceById = function () {

        $http({

            method: "Get",
            url: "/Hajj/HajjiReference/GetHajjiReferenceById?id=" + paramId

        }).success(function (response) {

            $scope.Hajji = response.Hajji;
            $scope.GroupLeader = response.GroupLeader;
            //$scope.Contract.ContractAmount = response.ContractAmount;
            $scope.Contract = response;

        }).error(function (response) {
            $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
        });
    };

    if (paramId != "") {
        $scope.GetHajjiReferenceById();
    }

}])