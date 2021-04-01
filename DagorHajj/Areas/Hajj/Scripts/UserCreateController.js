app.controller('UserCreateCtrl', ['$scope', '$http', 'appMessage', '$filter', function ($scope, $http, appMessage, $filter) {
    //================= GLOBAL VARIABLE ===================
    $scope.User = {};
    $scope.RoleList = [];
    $scope.CompanyList = [];
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.User.Id = 0;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    var paramId = location.search.substr(4);


    $scope.SelectRoleId = function (Val) {

        $scope.User.RoleId = Val.Id;

    }

    $scope.SelectCompanyId = function (Val) {

        $scope.User.ActiveBranchId = Val.ID;

    }
    //===================== Save Group Leader Data ===============

    $scope.SaveUserManager = function () {

        var url = "";

        url = "/Hajj/User/SaveUserManager";


        $http({
            method: "POST",
            url: url,
            data: $scope.User

        }).success(function (response) {

            if (response.Success == true) {

                $scope.submitted = false;

                $scope.User.Id = response.Id;
                $scope.User.RoleId = response.roleId

                $scope.alerts.push({ 'type': 'success', 'msg': response.Msg });
            }
            else {
                $scope.submitted = false;
                $scope.User.Id = response.Id;
                $scope.alerts.push({ 'type': 'danger', 'msg': response.Msg });
            }
        }).error(function (response) {

            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.GetAllRole = function () {
        $http({
            method: "GET",
            url: "/Hajj/User/GetAllRole"
        }).success(function (response) {
            $scope.RoleList = response;
        }).error(function () {

        });
    };
    $scope.GetAllRole();

    $scope.GetAllCompany = function () {
        $http({
            method: "GET",
            url: "/Hajj/User/GetAllCompany"
        }).success(function (response) {
            $scope.CompanyList = response;
        }).error(function () {

        });
    };
    $scope.GetAllCompany();

    $scope.GetUserManagerById = function () {

        $http({

            method: "Get",
            url: "/Hajj/User/GetUserManagerById?id=" + paramId

        }).success(function (response) {

            $scope.User = response;
            $scope.RoleName = response.RoleName;
            $scope.CompanyName = response.CompanyName;
            $scope.ConfirmPassword = response.ConfirmPassword;

        }).error(function (response) {
            $scope.alert.push({ 'type': 'danger', 'msg': $scope.AppMessage.fetch_warning });
        });
    };

    if (paramId != "") {
        $scope.GetUserManagerById();
    }

}]);

//app.directive("compareTo", function () {
//    return {
//        require: "ngModel",
//        scope: {
//            confirmPassword: "=compareTo"
//        },
//        link: function (scope, element, attributes, modelVal) {

//            modelVal.$validators.compareTo = function (val) {
//                return val == scope.ConfirmPassword;
//            };

//            scope.$watch("ConfirmPassword", function () {
//                modelVal.$validate();
//            });
//        }
//    };
//});