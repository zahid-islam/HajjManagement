app.controller('SettingsController', ['$scope', '$http', 'ngPattern', '$filter', 'appMessage', '$window', '$timeout',
function ($scope, $http, ngPattern, $filter, appMessage, $window, $timeout) {

    $scope.Setting = {};
    $scope.numericPattern = ngPattern.numericPattern;
    $scope.appMessage = appMessage;
    $scope.alerts = [];
    $scope.LastName = true;
    $scope.FirstName = true;

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.GetHajjInfoById = function () {
        $http({
            method: "GET",
            url: "/Hajj/Settings/GetSettingByCompanyId"
        }).success(function (response) {
            if (response)
            {
                $scope.Setting = response;
            }
        }).error(function (response) {
        });
    };
    $scope.GetHajjInfoById();

    $scope.SaveSetting = function () {
        var url = "/Hajj/Settings/SaveSettings";
        if ($scope.Setting.CompanyId > 0) {
            url = "/Hajj/Settings/UpdateSettings";
        }
        $http({
            method: "POST",
            url: url,
            data: $scope.Setting

        }).success(function (response) {
            if (response.Success == true) {
                $scope.Setting.CompanyId = response.CompanyId;
                $scope.Setting.Id = response.Id;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
            }
            if (response.Update == true)
            {
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.update });
            }
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

}]);