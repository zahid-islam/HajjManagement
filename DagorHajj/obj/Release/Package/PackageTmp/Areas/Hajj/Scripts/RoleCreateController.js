app.controller('RoleCreateCtrl', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.Role = {};   
    $scope.alerts = [];
    $scope.appMessage = appMessage;  
    $scope.Role.Id = 0;
    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);

           
    //===================== Save Group Leader Data ===============

    $scope.SaveRole = function () {

        var url = "";
        url = "/Hajj/Role/SaveRole";
        $http({
            method: "POST",
            url: url,
            data: $scope.Role

        }).success(function (response) {

            if (response.Success == true) {
                $scope.submitted = false;
                $scope.Role.Id = response.Id;
                $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
            }
            else {
                $scope.submitted = false;                
                $scope.Role.Id = response.Id;
                $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
            }
        }).error(function (response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.GetRoleById = function () {

        $http({

            method: "Get",
            url: "/Hajj/Role/GetRoleById?id=" + paramId

        }).success(function (response) {
            $scope.Role = response;                              
        }).error(function (response) {
            $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
        });
    };

    if (paramId != "") {
        $scope.GetRoleById();
    }

}])